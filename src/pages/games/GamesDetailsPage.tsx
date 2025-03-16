//@ts-ignore
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { gameOverviewItems } from '../../utils/data'
import { Box, Button, Typography } from '@mui/material'
import { usePublishMessage } from '../../hooks/mqtt/mqttHandlerContext'

import { MQTT } from '../../utils/api'
import { useSelectedGame, useStoppedGame } from '../../contexts/connectedDeviceContext'

import ResultsTable from './ResultsTable'

const GameDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const publishMessage = usePublishMessage()
  const selectedGame = useSelectedGame()
  const stoppedGame = useStoppedGame()

  const game = gameOverviewItems.find((item) => item.id === Number(id))
  if (!game) {
    return <div>Game not found!</div>
  }

  const [counter, setCounter] = useState(game.timer)

  const isGameStarted = selectedGame && selectedGame.isStarted && selectedGame.id === id
  const stoppedGameId = stoppedGame?.payload?.id ?? null
  const stoppedGamePoints = stoppedGame?.payload?.points ?? null
  const hasStoppedGame = selectedGame && stoppedGameId === game.id.toString()
  const messageUpdateCounter = stoppedGame?.messageUpdateCounter

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
    if (counter && isGameStarted && game.timer && counter > 0) {
      const timer = setTimeout(() => {
        setCounter(counter - 1)
      }, 1000)
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
        height: '100vh',
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
        {isGameStarted && game.timer && (
          <Box sx={{ paddingY: '1rem' }}>
            <Typography variant="h2">Tid:</Typography>
            <Typography variant="h2">{counter}</Typography>
          </Box>
        )}
        {isGameStarted && (
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
