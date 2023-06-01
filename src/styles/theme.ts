import { green, grey, lightGreen, orange, red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    htmlFontSize: 14,
    fontFamily: 'Press Start 2P',
    h1: {
      fontFamily: 'Roboto, Sans-serif',
      fontSize: '2rem',
      fontWeight: '600'
    },

    body1: {
      fontSize: '1rem',
      fontWeight: '600',
      lineHeight: '1.6'
    },
    body2: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.2'
    },
    h6: {
      fontSize: '0.9rem',
      fontWeight: '600',
      lineHeight: '1.6'
    }
  },
  palette: {
    background: {
      default: '#F5F5F5'
    },
    text: { primary: '#333333' },
    primary: {
      main: orange[500]
    },
    secondary: {
      light: grey[100],
      main: grey[400],
      dark: grey[500]
    },
    error: {
      main: red[700]
    },
    warning: {
      main: '#FFA500'
    },
    success: {
      light: lightGreen.A400,
      main: green[400],
      dark: green[500]
    }
  }
})