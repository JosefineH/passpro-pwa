import { ROUTES } from './api'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined'
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined'
import AddIcon from '@mui/icons-material/Add'
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined'
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined'
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined'
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined'
import { ICardItem } from './types'

export const overviewItems: ICardItem[] = [
  {
    title: 'Games',
    route: ROUTES.GAMES,
    description: 'Utmana dig själv och dina lagkamrater i olika spel',
    icon: <SportsEsportsOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Training',
    route: ROUTES.TRAINING,
    description: 'Kör på sparka boll',
    icon: <TimerOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Test',
    route: ROUTES.TESTS,
    description: 'Prova dina färdigheter med Passpro Test',
    icon: <SportsSoccerOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Statistik',
    route: ROUTES.STATISTICS,
    description: 'Se statistik från hela världen',
    icon: <LeaderboardOutlinedIcon fontSize="large" />,
  },
]

export const gameOverviewItems: ICardItem[] = [
  {
    title: 'Ackumulerad poäng',
    route: ROUTES.GAMES,
    description: 'Samla så mycket poäng du kan utan tidsgräns!',
    icon: <AddIcon fontSize="large" />,
  },
  {
    title: '30s challenge',
    route: ROUTES.TRAINING,
    description: 'Hur mycket poäng kan du samla på en halv minut?',
    icon: <TimerOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Shootout',
    route: ROUTES.TESTS,
    description: 'Skidskytte, fast med fotboll',
    icon: <AdjustOutlinedIcon fontSize="large" />,
  },
  {
    title: '10 random',
    route: ROUTES.STATISTICS,
    description: 'Träffa det markerade fältet',
    icon: <ShuffleOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Dart 31',
    route: ROUTES.STATISTICS,
    description: 'Få exakt 31 poäng',
    icon: <KeyboardDoubleArrowRightOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Train',
    route: ROUTES.STATISTICS,
    description: 'Ingen tid och ingen räkning',
    icon: <SportsSoccerOutlinedIcon fontSize="large" />,
  },
  {
    title: 'Timing',
    route: ROUTES.STATISTICS,
    description: 'Träffa ytan som är i rörelse tre gånger',
    icon: <SpeedOutlinedIcon fontSize="large" />,
  },
]
