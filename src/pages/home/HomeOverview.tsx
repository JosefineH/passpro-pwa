import { Box, Container } from '@mui/material'

import { useIsMobile } from '../../hooks/useIsMobile'
import { overviewItems } from '../../utils/data'
import { ICardItem } from '../../utils/types'
import { CustomCard } from '../../components/CustomCard'

const HomeOverview = () => {
  const isMobile = useIsMobile()
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1200px', textAlign: 'center' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '2rem',
          }}
        >
          {overviewItems.map((item: ICardItem, key: number) => (
            <CustomCard key={key} title={item.title} route={item.route} description={item.description} icon={item.icon} />
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default HomeOverview
