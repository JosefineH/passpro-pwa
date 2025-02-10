import { useNavigate } from 'react-router-dom'
import { useIsMobile } from '../hooks/useIsMobile'
import { Card, CardContent, Typography } from '@mui/material'
import { ICardItem } from '../utils/types'

export const CustomCard = ({ title, route, description, icon }: ICardItem) => {
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  return (
    <Card
      sx={{
        minWidth: 275,
        minHeight: isMobile ? 100 : 175,
        cursor: 'pointer',
        alignContent: 'center',
        '&:hover': {
          backgroundColor: '#a5d19796',
        },
      }}
      onClick={() => navigate(route)}
    >
      <CardContent>
        {icon}
        <Typography variant="h5" gutterBottom>
          {title}blue
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </CardContent>
    </Card>
  )
}
