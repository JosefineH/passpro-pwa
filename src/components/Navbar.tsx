import { AppBar, Box, Drawer, FormControl, IconButton, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import MenuIcon from '@mui/icons-material/Menu'
import PeopleIcon from '@mui/icons-material/People'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../utils/api'
import Logo from '../assets/logo_test.png'
import { useEffect, useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import { Settings } from '@mui/icons-material'
import { useConnectedDevice } from '../contexts/connectedDeviceContext'

const Navbar = () => {
  const isMobile = useIsMobile()
  const isDeviceConnected = useConnectedDevice()

  const navigate = useNavigate()
  const isHomeScreen = window.location.pathname === ROUTES.HOME

  const [selectedTeam, setSelectedTeam] = useState('Hammarby IF P13')
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {}, [isDeviceConnected])

  const handleTeamChange = (event: any) => {
    setSelectedTeam(event.target.value as string)
  }

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open)
  }

  return (
    <Box sx={{ width: isMobile ? '100vw' : '100%' }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#e0eadf',
          boxShadow: 'none',
          border: 'none',
        }}
      >
        <Toolbar
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr 1fr',
            alignItems: 'center',
          }}
        >
          {!isHomeScreen ? (
            <IconButton
              size="large"
              edge="start"
              aria-label="back"
              onClick={() => navigate(-1)}
              sx={{
                color: '#2c3e50',
                '&:hover': {
                  backgroundColor: '#e8eaf6',
                },
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          ) : (
            <Box sx={{ padding: '1rem' }}></Box>
          )}
          {!isMobile && (
            <Link to={ROUTES.SETTINGS}>
              {' '}
              <DeviceStatus isDeviceConnected={isDeviceConnected} />
            </Link>
          )}
          <Link to={ROUTES.HOME}>
            <img src={Logo} alt="Passpro logo" width={isMobile ? '175px' : '220px'} />
          </Link>

          {isMobile ? (
            <>
              <IconButton size="large" edge="end" aria-label="menu" onClick={() => toggleDrawer(true)} sx={{ color: '#2c3e50' }}>
                <MenuIcon />
              </IconButton>

              <Drawer anchor="right" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                <Box sx={{ width: 250, padding: '1rem' }} role="presentation" onClick={() => toggleDrawer(false)} onKeyDown={() => toggleDrawer(false)}>
                  <Link to={ROUTES.SETTINGS}>Min Passpro</Link>
                  <Link to={ROUTES.SETTINGS}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'left',
                      }}
                    >
                      <Settings sx={{ color: '#2c3e50' }} />
                      <Typography>Inställningar</Typography>
                    </Box>
                  </Link>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <PeopleIcon sx={{ paddingRight: '0.5rem', color: '#2c3e50' }} />
                    <FormControl>
                      <Select
                        sx={{
                          boxShadow: 'none',
                          '.MuiOutlinedInput-notchedOutline': { border: 0 },
                          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            border: 0,
                          },
                          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 0,
                          },
                        }}
                        labelId="team-select-label"
                        value={selectedTeam}
                        onChange={handleTeamChange}
                      >
                        <MenuItem value="Hammarby IF P13">Hammarby IF P13</MenuItem>
                        <MenuItem value="Hammarby IF Herrar">Hammarby IF Herrar</MenuItem>
                        <MenuItem value="Hammarby IF Damer">Hammarby IF Damer</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              <Link to={ROUTES.SETTINGS}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Settings sx={{ color: '#2c3e50' }} />
                  <Typography>Inställningar</Typography>
                </Box>
              </Link>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PeopleIcon sx={{ color: '#2c3e50' }} />
                <FormControl>
                  <Select
                    sx={{
                      boxShadow: 'none',
                      '.MuiOutlinedInput-notchedOutline': { border: 0 },
                      '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                        border: 0,
                      },
                      '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        border: 0,
                      },
                    }}
                    labelId="team-select-label"
                    value={selectedTeam}
                    onChange={handleTeamChange}
                  >
                    <MenuItem value="Hammarby IF P13">Hammarby IF P13</MenuItem>
                    <MenuItem value="Hammarby IF Herrar">Hammarby IF Herrar</MenuItem>
                    <MenuItem value="Hammarby IF Damer">Hammarby IF Damer</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

const DeviceStatus = ({ isDeviceConnected }: { isDeviceConnected: boolean }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box
        sx={{
          position: 'relative',
          width: '12px',
          height: '12px',
          backgroundColor: isDeviceConnected ? 'lightgreen' : 'red',
          borderRadius: '50%',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -2,
            left: -2,
            width: isDeviceConnected ? '16px' : 0,
            height: isDeviceConnected ? '16px' : 0,
            backgroundColor: 'green',
            borderRadius: '50%',
            opacity: 0.5,
            animation: isDeviceConnected ? 'blink 1.5s infinite ease-in-out' : null,
          },
          '@keyframes blink': {
            '0%, 100%': {
              opacity: 0.5,
              transform: 'scale(1)',
            },
            '50%': {
              opacity: 0,
              transform: 'scale(1.5)',
            },
          },
        }}
      />
      <Typography variant="body1" ml={1}>
        {isDeviceConnected ? 'Din Passpro är aktiv' : 'Din Passpro är inaktiv'}
      </Typography>
    </Box>
  )
}

export default Navbar
