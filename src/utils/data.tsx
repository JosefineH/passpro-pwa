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
import { ICardItem, IGame } from './types'

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

export const gameOverviewItems: IGame[] = [
  {
    title: 'Ackumulerad poäng',
    route: `${ROUTES.GAMES}/${1}`,
    description: 'Samla så mycket poäng du kan utan tidsgräns!',
    icon: <AddIcon fontSize="large" />,
    id: 1,
  },
  {
    title: '30s challenge',
    route: `${ROUTES.GAMES}/${2}`,
    description: 'Hur mycket poäng kan du samla på en halv minut?',
    icon: <TimerOutlinedIcon fontSize="large" />,
    id: 2,
    timer: 30,
  },
  {
    title: 'Shootout',
    route: `${ROUTES.GAMES}/${3}`,
    description: 'Skidskytte, fast med fotboll',
    icon: <AdjustOutlinedIcon fontSize="large" />,
    id: 3,
  },
  {
    title: '10 random',
    route: `${ROUTES.GAMES}/${4}`,
    description: 'Träffa det markerade fältet',
    icon: <ShuffleOutlinedIcon fontSize="large" />,
    id: 4,
  },
  {
    title: 'Dart 31',
    route: `${ROUTES.GAMES}/${5}`,
    description: 'Få exakt 31 poäng',
    icon: <KeyboardDoubleArrowRightOutlinedIcon fontSize="large" />,
    id: 5,
  },
  {
    title: 'Train',
    route: `${ROUTES.GAMES}/${6}`,
    description: 'Ingen tid och ingen räkning',
    icon: <SportsSoccerOutlinedIcon fontSize="large" />,
    id: 6,
  },
  {
    title: 'Timing',
    route: `${ROUTES.GAMES}/${7}`,
    description: 'Träffa ytan som är i rörelse tre gånger',
    icon: <SpeedOutlinedIcon fontSize="large" />,
    id: 7,
  },
]
