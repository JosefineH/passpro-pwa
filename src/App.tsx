import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import GameOverview from './pages/games/Games'
import { MqttHandlerProvider } from './hooks/mqtt/mqttHandlerContext'
import { ConnectedDeviceProvider } from './contexts/connectedDeviceContext'
import { ROUTES } from './utils/api'
import Navbar from './components/Navbar'
import { Box, ThemeProvider } from '@mui/material'
import GamesDetailsPage from './pages/games/GamesDetailsPage'
import { theme } from './utils/theme'
import Settings from './pages/settings/Settings'
import Statistics from './pages/statistics/Statistics'
import HomeOverview from './pages/home/Home'

const AppContent = () => {
  return (
    <ConnectedDeviceProvider>
      <MqttHandlerProvider>
        <Box sx={{ display: 'display', textAlign: 'center' }}>
          <Navbar />
          <Routes>
            <Route path={ROUTES.HOME} element={<HomeOverview />} />
            <Route path={ROUTES.GAMES} element={<GameOverview />} />
            <Route path={ROUTES.GAMES_DETAIL_PAGE} element={<GamesDetailsPage />} />
            <Route path={ROUTES.SETTINGS} element={<Settings />} />
            <Route path={ROUTES.STATISTICS} element={<Statistics />} />
          </Routes>
        </Box>
      </MqttHandlerProvider>
    </ConnectedDeviceProvider>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  )
}

export default App
