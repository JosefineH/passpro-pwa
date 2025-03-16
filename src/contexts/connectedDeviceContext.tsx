import { createContext, useState, ReactNode, useContext } from 'react'

interface ConnectedDeviceContextProps {
  setIsDeviceConnected: any
  isDeviceConnected: boolean
  totalGameScore: number
  setTotalGameScore: any
  selectedGame: SelectedGameProps | null
  setSelectedGame: any
  stoppedGame: StoppedGameProps | null
  setStoppedGame: any
}

export interface StoppedGameProps {
  messageUpdateCounter: number
  payload: StoppedGamePayload
}

interface StoppedGamePayload {
  id: string | null
  points: number | null
}

interface SelectedGameProps {
  id: string
  isStarted: boolean
}

export const ConnectedDeviceContext = createContext<ConnectedDeviceContextProps | undefined>(undefined)

export const ConnectedDeviceProvider = ({ children }: { children: ReactNode }) => {
  const [isDeviceConnected, setIsDeviceConnected] = useState<boolean>(false)
  const [totalGameScore, setTotalGameScore] = useState<number>(0)
  const [selectedGame, setSelectedGame] = useState<SelectedGameProps | null>(null)
  const [stoppedGame, setStoppedGame] = useState<StoppedGameProps | null>(null)

  console.log('stopped 2 ', stoppedGame)
  return (
    <ConnectedDeviceContext.Provider
      value={{
        isDeviceConnected: isDeviceConnected,
        setIsDeviceConnected: setIsDeviceConnected,
        totalGameScore: totalGameScore,
        setTotalGameScore: setTotalGameScore,
        selectedGame: selectedGame,
        setSelectedGame: setSelectedGame,
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

export const useSelectedGame = () => {
  const context = useContext(ConnectedDeviceContext)
  if (!context) {
    throw new Error('hook not used correct in context')
  }
  return context.selectedGame
}

export const useSetSelectedGame = () => {
  const context = useContext(ConnectedDeviceContext)
  if (!context) {
    throw new Error('hook not used correct in context')
  }
  return context.setSelectedGame
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
