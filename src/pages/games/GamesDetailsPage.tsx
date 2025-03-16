//@ts-ignore
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { gameOverviewItems } from '../../utils/data'
import { Box, Button, Paper, Typography } from '@mui/material'
import { usePublishMessage } from '../../hooks/mqtt/mqttHandlerContext'
import { TimerOutlined, ScoreboardOutlined } from '@mui/icons-material'
import { MQTT } from '../../utils/api'
import { useCurrentPoint, useSelectedGame, useStoppedGame } from '../../contexts/connectedDeviceContext'

import ResultsTable from './ResultsTable'

const GameDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const publishMessage = usePublishMessage()
  const selectedGame = useSelectedGame()
  const stoppedGame = useStoppedGame()
  const _currentPoint = useCurrentPoint()

  const game = gameOverviewItems.find((item) => item.id === Number(id))
  if (!game) {
    return <div>Game not found!</div>
  }

  const [counter, setCounter] = useState(game.timer)

  const isGameStarted = selectedGame && selectedGame.isStarted && selectedGame.id === id
  console.log('isGameStarted ', game.timer?.toString())
  const stoppedGameId = stoppedGame?.payload?.id ?? null
  const stoppedGamePoints = stoppedGame?.payload?.points ?? null
  const hasStoppedGame = selectedGame && stoppedGameId === game.id.toString()
  const messageUpdateCounter = stoppedGame?.messageUpdateCounter
  const currentPoint = _currentPoint?.id.toString() === game.id.toString() ? _currentPoint.points : null

  //Todo: Will this work? The same game is selected on the Passpro - will it then reset?
  const handleRestartClick = () => {
    publishMessage({ topic: MQTT.TOPICS.SELECT_GAME, message: game.id.toString() })
  }

  // Publish message to arduino to choose current game
  useEffect(() => {
    publishMessage({ topic: MQTT.TOPICS.SELECT_GAME, message: game.id.toString() })
    // setSelectedGame({ id: id, isStarted: false })
  }, [])

  // Todo: remove? replace with timer from arduino?
  useEffect(() => {
    if ((counter || counter === 0) && isGameStarted && game.timer !== null && counter >= 0) {
      let timer = 0
      console.log('hej ', timer)
      if (game.timerDirection === 'UP') {
        timer = setTimeout(() => {
          setCounter(counter + 1)
        }, 1000)
      }
      if (game.timerDirection === 'DOWN') {
        timer = setTimeout(() => {
          setCounter(counter - 1)
        }, 1000)
      }
      return () => clearTimeout(timer)
    }
    if (!isGameStarted) {
      setCounter(game.timer)
    }
  }, [isGameStarted, counter])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#e0eadf',
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ paddingY: '1rem' }}>
          <Typography sx={{ paddingBottom: '1rem' }} variant="h1">
            {game.title}
          </Typography>
          <Typography>{game.description}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
          {game.timer?.toString() && (
            <Paper
              elevation={3}
              sx={{
                padding: '1rem',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                color: '#2c3e50',
                minWidth: '200px',
                minHeight: '75px',
              }}
            >
              <TimerOutlined fontSize="large" />
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {counter}s
              </Typography>
            </Paper>
          )}
          {game.shouldShowInstansPoints && (
            <Paper
              elevation={3}
              sx={{
                padding: '1rem',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                color: '#2c3e50',
                minWidth: '200px',
                minHeight: '75px',
              }}
            >
              {/* <ScoreboardOutlined fontSize="large" /> */}
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Senaste poäng
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {currentPoint ? currentPoint : '-'}
              </Typography>
            </Paper>
          )}
        </Box>
        {isGameStarted && (
          <Box sx={{ padding: '1rem' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#4caf50',
              }}
              onClick={() => {
                handleRestartClick()
              }}
            >
              Starta om
            </Button>
          </Box>
        )}

        <Box
          sx={{
            paddingY: '1rem',
            paddingX: { xs: '1rem', sm: '2rem', md: '3rem' },
          }}
        >
          <ResultsTable isGameStarted={isGameStarted} hasStoppedGame={hasStoppedGame} stoppedGamePoints={stoppedGamePoints} gameId={game.id} messageUpdateCounter={messageUpdateCounter} />
        </Box>
      </Box>
    </Box>
  )
}

export default GameDetailsPage
