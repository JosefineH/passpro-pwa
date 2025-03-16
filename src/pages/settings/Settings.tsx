import React, { useState } from 'react'
import { Box, Container, MenuItem, FormControl, Select, InputLabel, Typography, List, ListItem, ListItemText } from '@mui/material'

const teamsData = {
  'Hammarby IF P13': [
    { name: 'Victor Lindelöf', age: 27, foot: 'Right', shirtNumber: 2 },
    { name: 'Alexander Isak', age: 26, foot: 'Right', shirtNumber: 17 },
    { name: 'Emil Forsberg', age: 31, foot: 'Left', shirtNumber: 10 },
  ],
  'Hammarby IF Herrar': [
    { name: 'Dejan Kulusevski', age: 24, foot: 'Right', shirtNumber: 21 },
    { name: 'Robin Olsen', age: 34, foot: 'Left', shirtNumber: 1 },
    { name: 'Filip Helander', age: 28, foot: 'Left', shirtNumber: 3 },
  ],
  'Harmmarby IF Damer': [
    { name: 'Pontus Jansson', age: 32, foot: 'Right', shirtNumber: 5 },
    { name: 'Martin Olsson', age: 35, foot: 'Left', shirtNumber: 15 },
    { name: 'Ludwig Augustinsson', age: 29, foot: 'Left', shirtNumber: 18 },
  ],
}

const Settings = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>('Hammarby IF P13')
  const [players, setPlayers] = useState<any>(teamsData['Hammarby IF P13'])

  const handleTeamChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const teamName = event.target.value as string
    setSelectedTeam(teamName)
    //@ts-ignore
    setPlayers(teamsData[teamName])
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#e0eadf',
        padding: '2rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '800px',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '2rem', color: '#2c3e50', fontWeight: 'bold' }}>
          Team Settings
        </Typography>

        {/* Team Dropdown */}
        <FormControl fullWidth sx={{ marginBottom: '2rem' }}>
          <InputLabel>Choose Team</InputLabel>
          {/* @ts-ignore */}
          <Select value={selectedTeam} onChange={handleTeamChange}>
            {Object.keys(teamsData).map((team) => (
              <MenuItem key={team} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Player List */}
        <Box sx={{ width: '100%', backgroundColor: '#fff', borderRadius: '8px', padding: '1rem' }}>
          <Typography variant="h6" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
            {selectedTeam}
          </Typography>
          <List>
            {players.map((player: any, index: number) => (
              <ListItem key={index} sx={{ padding: '1rem 0' }}>
                <ListItemText primary={`${player.name} (#${player.shirtNumber})`} secondary={`Age: ${player.age}, Foot: ${player.foot}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  )
}

export default Settings
