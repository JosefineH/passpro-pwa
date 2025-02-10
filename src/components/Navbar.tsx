import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../utils/api'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent' }}>
        <Toolbar sx={{ marginX: '2rem' }}>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={() => navigate(ROUTES.HOME)}>
            <HomeOutlinedIcon sx={{ color: 'black' }} />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: 'black' }}>
            Passpro
          </Typography>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={() => navigate(ROUTES.SETTINGS)}>
            <SettingsOutlinedIcon sx={{ color: 'black' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
