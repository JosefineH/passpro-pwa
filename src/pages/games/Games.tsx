import { Box, Container } from '@mui/material'
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
          marginBottom: '3rem',
        }}
      >
        {/* <Typography variant="h1" sx={{ paddingBottom: '2rem' }}>
          Välj spel
        </Typography> */}
        <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: isMobile ? '1rem' : '3rem' }}>
          {gameOverviewItems.map((item: ICardItem, key: number) => (
            <CustomCard key={key} title={item.title} route={item.route} shortDescription={item.shortDescription} description={item.description} icon={item.icon} />
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default GameOverview
