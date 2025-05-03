import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#fff'
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
      contrastText: '#fff'
    },
    background: {
      default: '#0a1929',
      paper: 'rgba(13, 25, 41, 0.95)'
    },
    text: {
      primary: '#fff',
      secondary: '#b0b8c1'
    },
    success: {
      main: '#00c853',
      dark: '#00a040'
    },
    error: {
      main: '#ff1744',
      dark: '#d50000'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em'
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.025em'
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.025em'
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.025em'
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.025em'
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.025em'
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '-0.025em'
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        },
        contained: {
          backgroundImage: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
          '&:hover': {
            backgroundImage: 'linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, rgba(13, 25, 41, 0.95) 0%, rgba(8, 19, 32, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.15)'
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.25)'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2196f3'
            }
          }
        }
      }
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
); 