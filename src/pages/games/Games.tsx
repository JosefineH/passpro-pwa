import { Box, Container, Typography } from '@mui/material'
import { ICardItem } from '../../utils/types'
import { useIsMobile } from '../../hooks/useIsMobile'
import { gameOverviewItems } from '../../utils/data'
import { CustomCard } from '../../components/CustomCard'

const GameOverview = () => {
  const isMobile = useIsMobile()

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f6fa',
        padding: '2rem',
      }}
    >
      <Box>
        <Typography variant="h1" sx={{ padding: '3rem' }}>
          Välj spel
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: isMobile ? '1rem' : '3rem' }}>
          {gameOverviewItems.map((item: ICardItem, key: number) => (
            <CustomCard key={key} title={item.title} route={item.route} description={item.description} icon={item.icon} />
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default GameOverview
