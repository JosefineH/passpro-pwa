import { createContext, useState, ReactNode, useContext, useEffect } from 'react'

interface ConnectedDeviceContextProps {
  setIsDeviceConnected: any
  isDeviceConnected: boolean
}

export const ConnectedDeviceContext = createContext<ConnectedDeviceContextProps | undefined>(undefined)

export const ConnectedDeviceProvider = ({ children }: { children: ReactNode }) => {
  const [isDeviceConnected, setIsDeviceConnected] = useState<boolean>(false)

  return (
    <ConnectedDeviceContext.Provider
      value={{
        isDeviceConnected: isDeviceConnected,
        setIsDeviceConnected: setIsDeviceConnected,
      }}
    >
      {children}
    </ConnectedDeviceContext.Provider>
  )
}

// Hook to access connected instruments
export const useConnectedDevice = () => {
  const context = useContext(ConnectedDeviceContext)
  if (!context) {
    throw new Error('useConnectedDevice must be used within a ConnectedDeviceProvider')
  }
  return context.isDeviceConnected
}

// Hook to set connected instruments
export const useSetConnectedDevice = () => {
  const context = useContext(ConnectedDeviceContext)
  if (!context) {
    throw new Error('useSetConnectedDevice must be used within a ConnectedDeviceProvider')
  }
  return context.setIsDeviceConnected
}
