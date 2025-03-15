import { AppBar, Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../utils/api'
import PeopleIcon from '@mui/icons-material/People'
import Logo from '../assets/logo_test.png'
import { useState } from 'react'

const Navbar = () => {
  const navigate = useNavigate()
  const isHomeScreen = window.location.pathname === ROUTES.HOME

  const [selectedTeam, setSelectedTeam] = useState('Hammarby IF P13')

  const handleTeamChange = (event: any) => {
    setSelectedTeam(event.target.value as string)
  }

  console.log('selected team ', selectedTeam)

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
          <Link to={ROUTES.HOME}>
            <img src={Logo} alt="Passpro logo" width="220px" />
          </Link>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
