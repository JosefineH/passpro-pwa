import { useNavigate } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { ICardItem } from '../utils/types'

export const CustomCard = ({ title, route, description, icon, shortDescription }: ICardItem) => {
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(route)
  }

  return (
    <Card
      sx={{
        minWidth: isMobile ? '100%' : '275px',
        // maxWidth: isMobile ? '100%' : '200px',
        minHeight: isMobile ? '120px' : '200px',
        cursor: 'pointer',
        borderRadius: '16px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
          backgroundColor: '#e8f5e9',
        },
        backgroundColor: '#ffffff',
      }}
      onClick={() => handleClick()}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '1.5rem',
        }}
      >
        <Box
          sx={{
            fontSize: '2rem',
            color: '#4caf50',
            // marginBottom: '1rem',
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: '0.5rem', color: '#2c3e50' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
          {shortDescription ? shortDescription : description}
        </Typography>
      </CardContent>
    </Card>
  )
}
