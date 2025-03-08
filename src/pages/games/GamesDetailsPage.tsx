import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { gameOverviewItems } from '../../utils/data'
import { Box, Button, Typography } from '@mui/material'
import { usePublishMessage } from '../../hooks/mqtt/mqttHandlerContext'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { MQTT } from '../../utils/api'
import { useStartedGame, useStoppedGame, useTotalGameScore } from '../../contexts/connectedDeviceContext'

type Row = {
  id: number
  name: string
  score: number | string
}

const GameDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const publishMessage = usePublishMessage()
  const [counter, setCounter] = useState(0)
  const [rows, setRows] = useState<Row[]>([])
  const [rowCounter, setRowCounter] = useState(1)

  const startedGame = useStartedGame()
  const isGameStarted = startedGame === id

  const stoppedGame = useStoppedGame()
  const { id: stoppedGameId, points: stoppedGamePoints } = stoppedGame
  const isGameStopped = id && stoppedGameId && stoppedGameId.toString() === id.toString()
  const totalGameScore = useTotalGameScore()

  // Find the game item based on the ID
  const game = gameOverviewItems.find((item) => item.id === Number(id))

  if (!game) {
    return <div>Game not found!</div>
  }

  const handleAddRow = (points: number | string) => {
    const newRow = {
      id: rowCounter,
      name: `Player ${rowCounter}`,
      score: points,
    }
    setRows((prevRows) => [...prevRows, newRow])
    setRowCounter((prevCounter) => prevCounter + 1)
  }

  // Publish message to arduino to choose current game
  useEffect(() => {
    publishMessage({ topic: MQTT.TOPICS.SELECT_GAME, message: game.id.toString() })
  }, [])

  // Todo: remove? replace with timer from arduino?
  useEffect(() => {
    if (isGameStarted && !isGameStopped && game.timer && counter < game.timer) {
      const timer = setTimeout(() => {
        setCounter(counter + 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isGameStarted, counter])

  useEffect(() => {
    if (isGameStopped) {
      if (stoppedGamePoints) {
        handleAddRow(stoppedGamePoints)
      } else {
        handleAddRow('Felaktig data, vänligen skriv in manuellt')
      }
    }
  }, [isGameStopped, stoppedGamePoints])

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Namn', width: 200 },
    { field: 'score', headerName: 'Poäng', width: 200 },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
          <Typography variant="h1">{game.title}</Typography>
          <Typography>{game.description}</Typography>
        </Box>
        {isGameStarted && game.timer && (
          <Box sx={{ paddingY: '1rem' }}>
            <Typography variant="h2">Time:</Typography>
            <Typography variant="h2">{counter}</Typography>
          </Box>
        )}
        {/* {totalGameScore ? (
          <Box sx={{ paddingY: '1rem' }}>
            <Typography variant="h2">Poäng:</Typography>
            <Typography variant="h2">{totalGameScore}</Typography>
          </Box>
        ) : null} */}
        <Box sx={{ paddingY: '1rem' }}>
          <Box sx={{ marginTop: '1rem', width: '1200px' }}>
            {rows.length ? (
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5, page: 0 },
                  },
                }}
                pageSizeOptions={[5]}
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default GameDetailsPage
