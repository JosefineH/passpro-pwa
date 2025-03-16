import { Box, Button } from '@mui/material'
import PlayerSelectModal from './PlayerModal'
import { PlayerProps, players } from '../../utils/data'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Delete, PersonAdd } from '@mui/icons-material'

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
      renderCell: (params: any) => {
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
      renderCell: (params: any) => {
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
              setRows((oldRows: Row[]) => oldRows.map((row: Row) => (row.id === newRow.id ? { ...row, ...newRow } : row)))
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

export default ResultsTable
