export const CONNECTED_DEVICE_ID = '/arduino'

export const MQTT = {
  TOPICS: {
    STATUS: CONNECTED_DEVICE_ID + '/status',
    SELECT_GAME: CONNECTED_DEVICE_ID + '/selectGame',
    TOTAL_GAME_SCORE: CONNECTED_DEVICE_ID + '/totalScore',
    STARTED_GAME: CONNECTED_DEVICE_ID + '/startedGame',
    STOPPED_GAME: CONNECTED_DEVICE_ID + '/stoppedGame',
    CURRENT_POINTS: CONNECTED_DEVICE_ID + '/currentPoints',
  },
}

export const ROUTES = {
  HOME: '/',
  GAMES: '/games',
  GAMES_DETAIL_PAGE: '/games/:id',
  STATISTICS: '/statistics',
  MYPASSPRO: '/mypasspro',
  SETTINGS: '/settings',
  TESTS: '/test',
  TRAINING: '/training',
}
