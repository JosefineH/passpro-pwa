//@ts-ignore
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { gameOverviewItems, PlayerProps, players } from '../../utils/data'
import { Box, Button, Modal, Typography } from '@mui/material'
import { usePublishMessage } from '../../hooks/mqtt/mqttHandlerContext'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { MQTT } from '../../utils/api'
import { useSelectedGame, useStoppedGame } from '../../contexts/connectedDeviceContext'
import { Delete, PersonAdd } from '@mui/icons-material'

import { format } from 'date-fns'

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
          <ResultsTable isGameStarted={isGameStarted} hasStoppedGame={hasStoppedGame} stoppedGamePoints={stoppedGamePoints} gameId={game.id} messageUpdateCounter={messageUpdateCounter} />
        </Box>
      </Box>
    </Box>
  )
}

interface RestultTableProps {
  isGameStarted: boolean | null
  hasStoppedGame: boolean | null
  stoppedGamePoints: number | null
  gameId: number
  messageUpdateCounter?: number
}

type Row = {
  id: number
  name: string
  score: number | string
  foot: string
  date: Date
}

const ResultsTable = ({ hasStoppedGame, stoppedGamePoints, gameId, messageUpdateCounter }: RestultTableProps) => {
  console.log('hasStoppedGame ', hasStoppedGame)
  const initialState = sessionStorage.getItem(gameId.toString())
  const [rows, setRows] = useState<Row[]>(initialState ? JSON.parse(initialState) : [])
  const [rowCounter, setRowCounter] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  const handleDeleteClick = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id))
  }

  const handleAddRow = (points: number | string) => {
    const newRow: Row = {
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
    if (hasStoppedGame && stoppedGamePoints) {
      handleAddRow(stoppedGamePoints)
    }
  }, [hasStoppedGame, stoppedGamePoints, messageUpdateCounter])

  const handleEditClick = (row: Row) => {
    setSelectedRow(row.id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSelectPlayer = (player: PlayerProps) => {
    setRows((prevRows) => prevRows.map((row) => (row.id === selectedRow ? { ...row, name: player.name } : row)))
    setIsModalOpen(false)
  }

  const handleClearTable = () => {
    setRows([]) // Reset rows to an empty array
    sessionStorage.removeItem('rows') // Clear rows from session storage
    setRowCounter(1) // Reset the row counter if necessary
  }

  //Save rows in session storage
  useEffect(() => {
    sessionStorage.setItem(gameId.toString(), JSON.stringify(rows))
  }, [rows])

  // Load rows from session storage on mount
  useEffect(() => {
    const savedRows = sessionStorage.getItem(gameId.toString())
    if (savedRows) {
      setRows(JSON.parse(savedRows))
    }
  }, [])

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
            <PersonAdd
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
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '6px',
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
      }}
    >
      {rows.length ? (
        <>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            //@ts-ignore
            processRowUpdate={(newRow, oldRow) => {
              setRows((oldRows) => oldRows.map((row) => (row.id === newRow.id ? { ...row, ...newRow } : row)))
              return newRow
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '0.5rem' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClearTable}
              sx={{
                backgroundColor: '#ec8c8c',
                '&:hover': { backgroundColor: '#b71c1c' },
                textTransform: 'none',
              }}
            >
              Rensa
            </Button>
          </Box>
        </>
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

            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e0e0e0', // Light border between rows
              fontSize: '0.9rem',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f0f0f0', // Light gray on hover
            },
            '& .MuiDataGrid-footerContainer': {
              display: 'none',
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
