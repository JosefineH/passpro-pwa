import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Client } from 'paho-mqtt'
import { useSetTotalGameScore, useSetConnectedDevice, useSetStartedGame, useSetStoppedGame } from '../../contexts/connectedDeviceContext'
import { MQTT } from '../../utils/api'

interface MqttHandlerContextProps {
  mqttIsConnected: boolean
  publishMessage: ({ topic, message }: { topic: string; message: string }) => void
}

const MqttHandlerContext = createContext<MqttHandlerContextProps>({
  mqttIsConnected: false,
  publishMessage: () => {},
})

const generateRandomClientId = () => {
  const randomNumber = Math.floor(Math.random() * 90000) + 10000
  return randomNumber.toString()
}

export const MqttHandlerProvider = ({ children }: { children: ReactNode }) => {
  const [mqttClient, setMqttClient] = useState<Client | undefined>(undefined)
  const [mqttIsConnected, setMqttIsConnected] = useState<boolean>(false)
  const setConnectedDevice = useSetConnectedDevice()
  const setTotalGameScore = useSetTotalGameScore()
  const setStartedGame = useSetStartedGame()
  const setStoppedGame = useSetStoppedGame()

  const options = {
    host: '93c23a0e8db6445f86be5111affa33b4.s1.eu.hivemq.cloud',
    port: 8884,
    protocol: 'wss',
    clientId: 'app' + generateRandomClientId(),
    userName: 'app-mqtt-user',
    password: 'Passpro1',
    keepAliveInterval: 30,
    cleanSession: true,
  }

  useEffect(() => {
    // Create and configure MQTT client
    const client = new Client(options.host, options.port, options.clientId)
    configureMqttClient(client)

    // Store the client in state
    setMqttClient(client)

    // Cleanup on unmount
    return () => {
      if (client.isConnected()) {
        client.disconnect()
        console.log('Disconnected MQTT client on component unmount')
      }
    }
  }, [])

  useEffect(() => {
    if (mqttClient) {
      if (!mqttClient.isConnected()) {
        connectMqttClient(mqttClient)
      }

      // Subscribe to topics
      if (mqttIsConnected) {
        mqttClient.subscribe(MQTT.TOPICS.STATUS)
        mqttClient.subscribe(MQTT.TOPICS.TOTAL_GAME_SCORE)
        mqttClient.subscribe(MQTT.TOPICS.STARTED_GAME)
        mqttClient.subscribe(MQTT.TOPICS.STOPPED_GAME)
      }

      // Handle incoming messages. TODO: Move to seperate function for readability
      if (mqttIsConnected) {
        mqttClient.onMessageArrived = (message: any) => {
          console.log('Message arrived:', message.destinationName)

          // If passpro is on or off
          if (message.destinationName.includes(MQTT.TOPICS.STATUS)) {
            if (message.payloadString === 'ONLINE') {
              console.log('PASSPRO IS ONLINE ')
              setConnectedDevice(true)
            }
            if (message.payloadString === 'OFFLINE') {
              console.log('PASSPRO IS OFFLINE')
              setConnectedDevice(false)
            }
          }

          // Total game point for current finished
          if (message.destinationName.includes(MQTT.TOPICS.TOTAL_GAME_SCORE)) {
            console.log('Total game score ', message.payloadString)
            setTotalGameScore(parseInt(message.payloadString))
          }

          // Game started from passpro
          if (message.destinationName.includes(MQTT.TOPICS.STARTED_GAME)) {
            console.log('Started Game ', message.payloadString)
            setStartedGame(message.payloadString)
          }
          // Game stopped from passpro. Includes game-id and total points
          if (message.destinationName.includes(MQTT.TOPICS.STOPPED_GAME)) {
            const payload = JSON.parse(message.payloadString)
            console.log('Stopped Game ', payload)
            setStoppedGame(payload)
          }
        }
      }
    }

    return () => {
      // Clean up handlers if the client changes
      if (mqttClient) {
        mqttClient.onMessageArrived = () => {} // Empty function instead of null
        mqttClient.onConnectionLost = () => {} // Empty function for cleanup
      }
    }
  }, [mqttClient, mqttIsConnected])

  const configureMqttClient = (client: Client) => {
    // Set onConnectionLost handler
    client.onConnectionLost = (error: any) => {
      console.error(`MQTT connection lost: ${error.errorMessage}`)
      setMqttIsConnected(false)
      reconnectMqttClient(client)
    }
  }

  const connectMqttClient = (client: Client) => {
    client.connect({
      useSSL: true,
      onSuccess: () => {
        console.log('Successfully connected MQTT client')
        setMqttClient(client)
        setMqttIsConnected(true)
      },
      onFailure: (error: any) => {
        console.error('MQTT connection failed:', error.errorMessage)
      },
      userName: options.userName,
      password: options.password,
      keepAliveInterval: options.keepAliveInterval,
    })
  }

  const reconnectMqttClient = (client: Client) => {
    setTimeout(() => {
      console.log('Attempting to reconnect MQTT client...')
      connectMqttClient(client)
    }, 5000) // Retry after 5 seconds
  }

  const publishMessage = ({ topic, message }: { topic: string; message: string }) => {
    console.log('Published message on topic: ', topic)
    console.log('Message: ', message)
    if (mqttClient?.isConnected) {
      mqttClient.send(topic, message, 0, false)
    } else {
      console.log('MQTT Client is not connected, could not publish message')
    }
  }

  return (
    <MqttHandlerContext.Provider
      value={{
        mqttIsConnected,
        publishMessage,
      }}
    >
      {children}
    </MqttHandlerContext.Provider>
  )
}

export const useMqttIsConnected = () => useContext(MqttHandlerContext).mqttIsConnected
export const usePublishMessage = () => useContext(MqttHandlerContext).publishMessage
