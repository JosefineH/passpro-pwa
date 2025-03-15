import { Box, Container, Typography, Grid, Paper, Card, CardContent } from '@mui/material'
import ReactCountryFlag from 'react-country-flag'

const mockData1 = [
  { name: 'Zlatan Ibrahimović', score: 85 },
  { name: 'Henrik Larsson', score: 82 },
  { name: 'Fredrik Ljungberg', score: 80 },
  { name: 'Tomas Brolin', score: 78 },
]

const mockData = {
  '30 Second Challenge': [
    { name: 'Zlatan Ibrahimović', score: 85 },
    { name: 'Henrik Larsson', score: 82 },
    { name: 'Fredrik Ljungberg', score: 80 },
    { name: 'Tomas Brolin', score: 78 },
    { name: 'Kim Källström', score: 76 },
    { name: 'Marcus Berg', score: 75 },
    { name: 'Janne Andersson', score: 74 },
    { name: 'Sebastian Larsson', score: 72 },
    { name: 'Olof Mellberg', score: 70 },
    { name: 'Anders Svensson', score: 68 },
  ],
  'Dart 31': [
    { name: 'Filip Helander', score: '22s' },
    { name: 'Ludwig Augustinsson', score: '23s' },
    { name: 'Albin Ekdal', score: '24s' },
    { name: 'Martin Olsson', score: '25s' },
    { name: 'Emil Forsberg', score: '26s' },
    { name: 'Robin Olsen', score: '27s' },
    { name: 'Pontus Jansson', score: '28s' },
    { name: 'Dejan Kulusevski', score: '29s' },
    { name: 'Alexander Isak', score: '30s' },
    { name: 'Victor Lindelöf', score: '31s' },
  ],
  Shootout: [
    { name: 'Janne Andersson', score: 50 },
    { name: 'Zlatan Ibrahimović', score: 48 },
    { name: 'Henrik Larsson', score: 45 },
    { name: 'Dejan Kulusevski', score: 43 },
    { name: 'Alexander Isak', score: 42 },
    { name: 'Emil Forsberg', score: 40 },
    { name: 'Victor Lindelöf', score: 38 },
    { name: 'Sebastian Larsson', score: 35 },
    { name: 'Robin Quaison', score: 33 },
    { name: 'Pontus Jansson', score: 30 },
  ],
  '10 Random': [
    { name: 'Emil Forsberg', score: 55 },
    { name: 'Zlatan Ibrahimović', score: 54 },
    { name: 'Henrik Larsson', score: 53 },
    { name: 'Victor Lindelöf', score: 52 },
    { name: 'Alexander Isak', score: 51 },
    { name: 'Dejan Kulusevski', score: 50 },
    { name: 'Kim Källström', score: 49 },
    { name: 'Fredrik Ljungberg', score: 48 },
    { name: 'Olof Mellberg', score: 47 },
    { name: 'Anders Svensson', score: 46 },
  ],
}

const averageScore = (data: { score: number }[]) => {
  const total = data.reduce((sum, player) => sum + player.score, 0)
  return (total / data.length).toFixed(2)
}

const topScorer = (data: { name: string; score: number }[]) => {
  return data.reduce((top, player) => (player.score > top.score ? player : top), data[0])
}

const Statistics = () => {
  const avgScore = averageScore(mockData1)
  const topPlayer = topScorer(mockData1)

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#e0eadf',
        padding: '2rem',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
        Today's top scorer
      </Typography>
      <Grid container spacing={3} sx={{ marginBottom: '2rem', width: '100%' }}>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              padding: '1rem',
              textAlign: 'center',
              backgroundColor: '#ffffff',
              color: '#2c3e50',
            }}
          >
            <Typography variant="h6">Average Score</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {avgScore}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              padding: '1rem',
              textAlign: 'center',
              backgroundColor: '#ffffff',
              color: '#2c3e50',
            }}
          >
            <Typography variant="h6">Top Scorer</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {topPlayer.name}
            </Typography>
            <Typography variant="subtitle1">{topPlayer.score} Points</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={3}
            sx={{
              padding: '1rem',
              textAlign: 'center',
              backgroundColor: '#ffffff',
              color: '#2c3e50',
            }}
          >
            <Typography variant="h6">Total Games</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {mockData1.length}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Typography
        variant="h4"
        sx={{
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Passpro Games topplist
        <ReactCountryFlag countryCode="SE" svg style={{ fontSize: '2rem', paddingLeft: '1rem' }} />
      </Typography>

      <Grid container spacing={4}>
        {Object.entries(mockData).map(([game, scores]) => (
          <Grid item xs={12} sm={6} lg={3} key={game}>
            <Card
              sx={{
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                backgroundColor: '#ffffff',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: '1rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#1976d2',
                  }}
                >
                  {game}
                </Typography>
                {scores.map((player, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.5rem 0',
                      borderBottom: index !== scores.length - 1 ? '1px solid #e0e0e0' : 'none',
                    }}
                  >
                    <Typography variant="body1">{`${index + 1}. ${player.name}`}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {player.score}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Statistics
