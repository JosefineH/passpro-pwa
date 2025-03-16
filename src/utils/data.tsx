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

    shortDescription: 'Samla så mycket poäng du kan utan tidsgräns!',
    description: 'Samla så mycket poäng du kan utan tidsgräns!',
    icon: <AddIcon fontSize="large" />,
    id: 1,
    shouldShowInstansPoints: true,
    shouldShowResultsTable: false,
  },
  {
    title: '30s challenge',
    route: `${ROUTES.GAMES}/${2}`,
    shortDescription: 'Hur mycket poäng kan du få på 30 sekunder?',
    description: 'Du har 30 sekunder på dig att samla så mycket poäng som möjligt. Spelet börjar vid första träffen på Passpro.',
    icon: <TimerOutlinedIcon fontSize="large" />,
    id: 2,
    timer: 30,
    timerDirection: 'DOWN',
    shouldShowInstansPoints: true,
    shouldShowResultsTable: true,
  },
  {
    title: 'Shootout',
    route: `${ROUTES.GAMES}/${3}`,
    shortDescription: 'Skidskytte, fast med fotboll',
    description: 'Passpro kommer att lysa upp 5 stycken gånger. Träffa de på så kort tid som möjligt!',
    icon: <AdjustOutlinedIcon fontSize="large" />,
    id: 3,
    timer: 0,
    timerDirection: 'UP',
    shouldShowResultsTable: true,
  },
  {
    title: '10 random',
    route: `${ROUTES.GAMES}/${4}`,
    shortDescription: 'Träffa det markerade fältet',
    description: 'Träffa det markerade fältet',
    icon: <ShuffleOutlinedIcon fontSize="large" />,
    id: 4,
    shouldShowResultsTable: true,
  },
  {
    title: 'Dart 31',
    route: `${ROUTES.GAMES}/${5}`,
    shortDescription: 'Få exakt 31 poäng',
    description: 'Få exakt 31 poäng',
    icon: <KeyboardDoubleArrowRightOutlinedIcon fontSize="large" />,
    id: 5,
    shouldShowResultsTable: true,
    shouldShowInstansPoints: true,
  },
  {
    title: 'Train',
    route: `${ROUTES.GAMES}/${6}`,
    shortDescription: 'Ingen tid och ingen räkning',
    description: 'Ingen tid och ingen räkning',
    icon: <SportsSoccerOutlinedIcon fontSize="large" />,
    id: 6,
    shouldShowResultsTable: false,
    shouldShowInstansPoints: true,
  },
  {
    title: 'Timing',
    route: `${ROUTES.GAMES}/${7}`,
    shortDescription: 'Träffa ytan som är i rörelse tre gånger',
    description: 'Träffa ytan som är i rörelse tre gånger',
    icon: <SpeedOutlinedIcon fontSize="large" />,
    id: 7,
    shouldShowResultsTable: true,
  },
]

export interface PlayerProps {
  id: number
  name: string
  age: number
  preferredStrikerFoot: 'left' | 'right' | 'both'
  shirtNumber: number
}

export const players: PlayerProps[] = [
  { id: 0, name: 'Oscar Johansson', age: 16, preferredStrikerFoot: 'right', shirtNumber: 9 },
  {
    name: 'Lukas Andersson',
    age: 17,
    preferredStrikerFoot: 'left',
    shirtNumber: 10,
    id: 1,
  },
  {
    name: 'Maja Olsson',
    age: 16,
    preferredStrikerFoot: 'both',
    shirtNumber: 11,
    id: 2,
  },
  {
    name: 'Elliot Persson',
    age: 18,
    preferredStrikerFoot: 'right',
    shirtNumber: 7,
    id: 3,
  },
  {
    name: 'Wilma Karlsson',
    age: 17,
    preferredStrikerFoot: 'left',
    shirtNumber: 8,
    id: 4,
  },
  {
    name: 'Felix Nilsson',
    age: 16,
    preferredStrikerFoot: 'right',
    shirtNumber: 6,
    id: 5,
  },
  {
    name: 'Isabella Eriksson',
    age: 18,
    preferredStrikerFoot: 'both',
    shirtNumber: 14,
    id: 6,
  },
  {
    name: 'Theo Larsson',
    age: 17,
    preferredStrikerFoot: 'left',
    shirtNumber: 15,
    id: 7,
  },
  {
    name: 'Alva Sundberg',
    age: 16,
    preferredStrikerFoot: 'right',
    shirtNumber: 18,
    id: 8,
  },
  {
    name: 'Max Lindström',
    age: 18,
    preferredStrikerFoot: 'right',
    shirtNumber: 20,
    id: 9,
  },
]
