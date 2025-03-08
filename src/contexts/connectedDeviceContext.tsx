import { createContext, useState, ReactNode, useContext } from 'react'

interface ConnectedDeviceContextProps {
  setIsDeviceConnected: any
  isDeviceConnected: boolean
  totalGameScore: number
  setTotalGameScore: any
  startedGame: number | any
  setStartedGame: any
  stoppedGame: StoppedGameProps
  setStoppedGame: any
}

interface StoppedGameProps {
  id: number | null
  points: number | null
}

export const ConnectedDeviceContext = createContext<ConnectedDeviceContextProps | undefined>(undefined)

export const ConnectedDeviceProvider = ({ children }: { children: ReactNode }) => {
  const [isDeviceConnected, setIsDeviceConnected] = useState<boolean>(false)
  const [totalGameScore, setTotalGameScore] = useState<number>(0)
  const [startedGame, setStartedGame] = useState<number | null>(null)
  const [stoppedGame, setStoppedGame] = useState<StoppedGameProps>({ id: 1, points: 1 })

  console.log('stopped 3 ', stoppedGame)

  return (
    <ConnectedDeviceContext.Provider
      value={{
        isDeviceConnected: isDeviceConnected,
        setIsDeviceConnected: setIsDeviceConnected,
        totalGameScore: totalGameScore,
        setTotalGameScore: setTotalGameScore,
        startedGame: startedGame,
        setStartedGame: setStartedGame,
        stoppedGame: stoppedGame,
        setStoppedGame: setStoppedGame,
      }}
    >
      {children}
    </ConnectedDeviceContext.Provider>
  )
}

// Hook to access connected passpro
export const useConnectedDevice = () => {
  const context = useContext(ConnectedDeviceContext)
  if (!context) {
    throw new Error('useConnectedDevice must be used within a ConnectedDeviceProvider')
  }
  return context.isDeviceConnected
}

// Hook to set connected passpro
export const useSetConnectedDevice = () => {
  const context = useContext(ConnectedDeviceContext)
  if (!context) {
    throw new Error('useSetConnectedDevice must be used within a ConnectedDeviceProvider')
  }
  return context.setIsDeviceConnected
}

export const useSetTotalGameScore = () => {
  const context = useContext(ConnectedDeviceContext)
  if (!context) {
    throw new Error('useSetConnectedDevice must be used within a useGetTotalGameScore')
  }
  return context.setTotalGameScore
}

export const useTotalGameScore = () => {
  const context = useContext(ConnectedDeviceContext)
  if (!context) {
    throw new Error('useSetConnectedDevice must be used within a useGetTotalGameScore')
  }
  return context.totalGameScore
}

export const useStartedGame = () => {
  const context = useContext(ConnectedDeviceContext)
  if (!context) {
    throw new Error('hook not used correct in context')
  }
  return context.startedGame
}

export const useSetStartedGame = () => {
  const context = useContext(ConnectedDeviceContext)
  if (!context) {
    throw new Error('hook not used correct in context')
  }
  return context.setStartedGame
}

export const useStoppedGame = () => {
  const context = useContext(ConnectedDeviceContext)
  if (!context) {
    throw new Error('hook not used correct in context')
  }
  return context.stoppedGame
}

export const useSetStoppedGame = () => {
  const context = useContext(ConnectedDeviceContext)
  if (!context) {
    throw new Error('hook not used correct in context')
  }
  return context.setStoppedGame
}
