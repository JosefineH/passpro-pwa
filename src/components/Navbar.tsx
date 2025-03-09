import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../utils/api'
import PeopleIcon from '@mui/icons-material/People'

const Navbar = () => {
  const navigate = useNavigate()
  const isHomeScreen = window.location.pathname === ROUTES.HOME

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#e0eadf',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '0 0 16px 16px',
          padding: '0 1rem',
        }}
      >
        <Toolbar
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 6fr 1fr',
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
                // backgroundColor: '#f5f6fa',
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

          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              fontWeight: 700,
              color: '#2c3e50',
            }}
          >
            Passpro
          </Typography>

          <IconButton
            size="large"
            edge="end"
            aria-label="settings"
            onClick={() => navigate(ROUTES.SETTINGS)}
            sx={{
              color: '#2c3e50',
              //   backgroundColor: '#f5f6fa',
              '&:hover': {
                // backgroundColor: '#e8eaf6',
              },
            }}
          >
            <PeopleIcon sx={{ paddingRight: '0.5rem' }} />
            <Typography> Hammarby IF p13</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
