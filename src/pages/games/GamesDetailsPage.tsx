import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { gameOverviewItems, PlayerProps, players } from '../../utils/data'
import { Box, Button, List, ListItem, Modal, Typography } from '@mui/material'
import { usePublishMessage } from '../../hooks/mqtt/mqttHandlerContext'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'

import { MQTT } from '../../utils/api'
import { useSelectedGame, useSetSelectedGame, useStoppedGame, useTotalGameScore } from '../../contexts/connectedDeviceContext'
import { Delete } from '@mui/icons-material'

import { format } from 'date-fns'

const GameDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const game = gameOverviewItems.find((item) => item.id === Number(id))

  if (!game) {
    return <div>Game not found!</div>
  }

  const publishMessage = usePublishMessage()
  const [counter, setCounter] = useState(game.timer)

  console.log('counter ', counter)

  const selectedGame = useSelectedGame()
  const setSelectedGame = useSetSelectedGame()
  const isGameStarted = selectedGame && selectedGame.isStarted && selectedGame.id === id
  console.log('selectedGame ', selectedGame)

  const stoppedGame = useStoppedGame()
  const stoppedGameId = stoppedGame?.id ?? null
  const stoppedGamePoints = stoppedGame?.points ?? null
  const hasStoppedGame = selectedGame && stoppedGameId === id
  //   const isGameStopped = !selectedGame.isStarted && se
  //   const totalGameScore = useTotalGameScore()

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
        // alignItems: 'center',
        backgroundColor: '#f5f6fa',
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
            <Typography variant="h2">Time:</Typography>
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
          <ResultsTable isGameStarted={isGameStarted} hasStoppedGame={hasStoppedGame} stoppedGamePoints={stoppedGamePoints} />
        </Box>
      </Box>
    </Box>
  )
}

interface RestultTableProps {
  isGameStarted: boolean | null
  hasStoppedGame: boolean | null
  stoppedGamePoints: number | null
}

type Row = {
  id: number
  name: string
  score: number | string
  foot: string
}

const ResultsTable = ({ isGameStarted, hasStoppedGame, stoppedGamePoints }: RestultTableProps) => {
  // const [alert, setAlert] = useState(initialAlert)
  const [rows, setRows] = useState<Row[]>([])
  const [rowCounter, setRowCounter] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState<Row | null>(null)

  const handleDeleteClick = (id: number) => {
    // Update the rows state to remove the row with the specified ID
    setRows((prevRows) => prevRows.filter((row) => row.id !== id))
  }

  const handleAddRow = (points: number | string) => {
    const newRow = {
      id: rowCounter,
      name: `Spelare ${rowCounter}`,
      score: points,
      date: new Date(),
      foot: 'both',
    }
    setRows((prevRows) => [...prevRows, newRow])
    setRowCounter((prevCounter) => prevCounter + 1)
  }

  useEffect(() => {
    if (!isGameStarted && hasStoppedGame && stoppedGamePoints) {
      handleAddRow(stoppedGamePoints)
    }
  }, [isGameStarted, stoppedGamePoints])

  const handleEditClick = (player: Row) => {
    setSelectedPlayer(player) // Set the selected player
    setIsModalOpen(true) // Open the modal
  }

  const handleCloseModal = () => {
    setIsModalOpen(false) // Close the modal
  }

  const handleSelectPlayer = (player: PlayerProps) => {
    console.log('handleSELECT ', player)
    setRows((prevRows) => prevRows.map((row) => (row.id === player.id ? { ...row, name: player.name } : row)))

    setIsModalOpen(false) // Close the modal after selecting
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Namn',
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ marginRight: '8px' }}>{params.value}</span>
            <EditIcon
              sx={{
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: '#2c3034',
              }}
              onClick={() => handleEditClick(params.row)}
            />
          </Box>
        )
      },
    },
    { field: 'score', headerName: 'Poäng', width: 200 },
    {
      field: 'foot',
      headerName: 'Fot',
      width: 200,
      editable: true,
      type: 'singleSelect',
      valueOptions: [
        { value: 'right', label: 'Höger' },
        { value: 'left', label: 'Vänster' },
        { value: 'both', label: 'Båda' },
      ],
    },
    {
      field: 'date',
      headerName: 'Datum',
      width: 200,
      renderCell: (params) => {
        const formattedDate = format(new Date(params.value), 'yyyy-MM-dd HH:mm')
        return <span>{formattedDate}</span>
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 80,
      sortable: false,
      flex: 0,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Delete
              sx={{
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: '#2c3034',
              }}
              onClick={() => handleDeleteClick(params.id as number)}
            />
          </Box>
        )
      },
    },
  ]

  return (
    <Box
      sx={{
        marginTop: '1rem',
        width: '100%',
        maxWidth: '1200px',
        marginX: 'auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
        borderRadius: '6px', // Round corners
        overflow: 'hidden', // Prevent overflow due to rounded corners
        backgroundColor: '#f9f9f9', // Light background for contrast
      }}
    >
      {rows.length ? (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[10]}
          sx={{
            minWidth: '400px',
            //   border: 'none', // Remove default border
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#1976d2', // Blue header background
              color: '#000000', // White header text
              fontSize: '1rem',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e0e0e0', // Light border between rows
              fontSize: '0.9rem',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f0f0f0', // Light gray on hover
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#f1f1f1', // Footer background
              borderTop: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-selectedRowCount': {
              display: 'none',
            },
            '& .MuiDataGrid-pagination': {
              justifyContent: 'flex-end', // Align pagination to the right
              paddingRight: '1rem',
            },
            '& .MuiDataGrid-sortIcon': {
              opacity: 'inherit !important',
            },
            '& .MuiDataGrid-columnSeparator--resizable': {
              display: 'none',
              backgroundColor: 'blue',
            },
          }}
        />
      ) : null}
      <PlayerSelectModal isOpen={isModalOpen} onClose={handleCloseModal} players={players} onSelectPlayer={handleSelectPlayer} />
    </Box>
  )
}

interface PlayerSelectModalProps {
  isOpen: boolean
  onClose: any
  players: PlayerProps[]
  onSelectPlayer: any
}

const PlayerSelectModal = ({ isOpen, onClose, players, onSelectPlayer }: PlayerSelectModalProps) => {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Namn',
      width: 200,
    },
    { field: 'shirtNumber', headerName: 'Tröjnummer', width: 200 },
    {
      field: 'preferredStrikerFoot',
      headerName: 'Fot',
      width: 200,
    },
    {
      field: 'age',
      headerName: 'Ålder',
      width: 200,
    },
  ]
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          textAlign: 'center',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          height: '80%',
          backgroundColor: 'white',
          padding: '20px',
          boxShadow: 24,
          borderRadius: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Välj en spelare
        </Typography>
        <DataGrid
          rows={players}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 100, page: 0 },
            },
          }}
          onRowClick={(params) => onSelectPlayer(params.row)}
          pageSizeOptions={[100]}
          sx={{
            minWidth: '400px',
            //   border: 'none', // Remove default border
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#1976d2', // Blue header background
              color: '#000000', // White header text
              fontSize: '1rem',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e0e0e0', // Light border between rows
              fontSize: '0.9rem',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f0f0f0', // Light gray on hover
            },
            '& .MuiDataGrid-footerContainer': {
              display: 'none',
              //   backgroundColor: '#f1f1f1', // Footer background
              //   borderTop: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-selectedRowCount': {
              display: 'none',
            },
            '& .MuiDataGrid-pagination': {
              justifyContent: 'flex-end', // Align pagination to the right
              paddingRight: '1rem',
            },
            '& .MuiDataGrid-sortIcon': {
              opacity: 'inherit !important',
            },
            '& .MuiDataGrid-columnSeparator--resizable': {
              display: 'none',
              backgroundColor: 'blue',
            },
          }}
        />
        <Button onClick={onClose} sx={{ marginTop: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  )
}

export default GameDetailsPage
