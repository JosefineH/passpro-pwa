import { Box, Container, Typography } from '@mui/material'
import { useConnectedDevice } from '../../contexts/connectedDeviceContext'
import { useEffect } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'
import { overviewItems } from '../../utils/data'
import { ICardItem } from '../../utils/types'
import { CustomCard } from '../../components/CustomCard'

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
            top: 0,
            left: 0,
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
      <Typography variant="body2" ml={1}>
        {isDeviceConnected ? 'Passpro är aktiv' : 'Passpro är inaktiv'}
      </Typography>
    </Box>
  )
}

const Home = () => {
  const isDeviceConnected = useConnectedDevice()
  const isMobile = useIsMobile()

  useEffect(() => {}, [isDeviceConnected])

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mb: '3rem' }}>
          <Typography variant="h4" sx={{ padding: '3rem 0 2rem 0' }}>
            Välj mode
          </Typography>
          <DeviceStatus isDeviceConnected={isDeviceConnected} />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '1rem' : '3rem' }}>
          {overviewItems.map((item: ICardItem, key: number) => (
            <CustomCard key={key} title={item.title} route={item.route} description={item.description} icon={item.icon} />
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default Home
