import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import { useConnectedDevice } from '../../contexts/connectedDeviceContext'
import { useEffect } from 'react'

const Home = () => {
  const isDeviceConnected = useConnectedDevice()

  useEffect(() => {
    console.log('isDEviceConnected ', isDeviceConnected)
  }, [isDeviceConnected])

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          height: '100%',
          width: '100%',
        }}
      >
        <h1>Passpro</h1>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          <DashBoardCard />
          <DashBoardCard />
          <DashBoardCard />
          <DashBoardCard />
        </Box>
      </Box>
    </Container>
  )
}
const DashBoardCard = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          Hello
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
        <Typography variant="body2">well meaning and kindly.</Typography>
      </CardContent>
    </Card>
  )
}

export default Home
