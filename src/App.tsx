import './App.css'
import Home from '../src/pages/home/home'
import { MqttHandlerProvider } from './hooks/mqtt/mqttHandlerContext'
import { ConnectedDeviceProvider } from './contexts/connectedDeviceContext'

function App() {
  return (
    <ConnectedDeviceProvider>
      <MqttHandlerProvider>
        <Home />
      </MqttHandlerProvider>
    </ConnectedDeviceProvider>
  )
}

export default App
