import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#000000',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#000000',
    },
    body1: {
      fontSize: '1rem',
      color: '#000000',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#000000',
    },
  },
})
