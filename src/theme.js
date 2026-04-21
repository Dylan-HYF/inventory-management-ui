import { alpha, createTheme } from '@mui/material/styles';

export const getAppTheme = (mode = 'light') => createTheme({
  palette: {
    mode,
    primary: { main: '#3b82f6' },
    secondary: { main: '#8b5cf6' },
    success: { main: '#16a34a' },
    warning: { main: '#f59e0b' },
    error: { main: '#ef4444' },
    info: { main: '#06b6d4' },
    background: {
      default: mode === 'light' ? '#f4f7fb' : '#0f172a',
      paper: mode === 'light' ? '#ffffff' : '#111827'
    }
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: `'Inter', 'Segoe UI', 'Roboto', sans-serif`,
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: mode === 'light'
            ? 'radial-gradient(circle at top, rgba(59,130,246,0.08), transparent 30%)'
            : 'radial-gradient(circle at top, rgba(59,130,246,0.16), transparent 25%)'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${mode === 'light' ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: mode === 'light'
            ? '0 10px 30px rgba(15, 23, 42, 0.06)'
            : '0 14px 34px rgba(0, 0, 0, 0.28)'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${mode === 'light' ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: mode === 'light'
            ? '0 10px 30px rgba(15, 23, 42, 0.06)'
            : '0 14px 34px rgba(0, 0, 0, 0.28)',
          transition: 'transform 180ms ease, box-shadow 180ms ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: mode === 'light'
              ? '0 16px 36px rgba(15, 23, 42, 0.1)'
              : '0 18px 40px rgba(0, 0, 0, 0.34)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingInline: 16
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: mode === 'light' ? alpha('#ffffff', 0.8) : alpha('#0b1220', 0.85)
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none'
        }
      }
    }
  }
});
