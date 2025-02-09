import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { Client } from 'paho-mqtt'
import { useSetConnectedDevice } from '../../contexts/connectedDeviceContext'

interface MqttHandlerContextProps {
  mqttIsConnected: boolean
}

const MqttHandlerContext = createContext<MqttHandlerContextProps>({
  mqttIsConnected: false,
})

const generateRandomClientId = () => {
  const randomNumber = Math.floor(Math.random() * 90000) + 10000
  return randomNumber.toString()
}

export const MqttHandlerProvider = ({ children }: { children: ReactNode }) => {
  const [mqttClient, setMqttClient] = useState<Client | undefined>(undefined)
  const [mqttIsConnected, setMqttIsConnected] = useState<boolean>(false)
  const setConnectedDevice = useSetConnectedDevice()

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
      // Ensure the connection state reflects the client's actual state
      if (!mqttClient.isConnected()) {
        connectMqttClient(mqttClient)
      }

      // Subscribe to topics or perform actions when connected
      mqttClient.onMessageArrived = (message: any) => {
        console.log('Message arrived:', message.destinationName)
        if (message.destinationName.includes('/arduino-r4-1/status/')) {
          if (message.payloadString === 'ONLINE') {
            console.log('PASSPRO IS ONLINE ')
            setConnectedDevice(true)
          }
          if (message.payloadString === 'OFFLINE') {
            console.log('PASSPRO IS OFFLINE')
            setConnectedDevice(false)
          }
        }
      }

      if (mqttIsConnected) {
        mqttClient.subscribe('/arduino-r4-1/status/')
        console.log('subscribed')
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

  return (
    <MqttHandlerContext.Provider
      value={{
        mqttIsConnected,
      }}
    >
      {children}
    </MqttHandlerContext.Provider>
  )
}

export const useMqttIsConnected = () => useContext(MqttHandlerContext).mqttIsConnected
