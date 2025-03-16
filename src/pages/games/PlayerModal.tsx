import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { PlayerProps } from '../../utils/data'
import { Box, Button, Modal, Typography } from '@mui/material'

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

export default PlayerSelectModal
