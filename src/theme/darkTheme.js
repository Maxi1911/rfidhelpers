import { createTheme } from '@mui/material/styles';

export const darkMuiTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0b0f19',
      paper: '#131927',
    },
    primary: {
      main: '#10b981', // Rich Emerald Green (replaces sky blue)
      light: '#34d399',
      dark: '#059669',
      contrastText: '#0b0f19',
    },
    secondary: {
      main: '#8b5cf6', // Deep Royal Violet
      light: '#c084fc',
      dark: '#6d28d9',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
    },
    error: {
      main: '#f43f5e',
      light: '#fb7185',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
      disabled: '#64748b',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0b0f19',
          color: '#f8fafc',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#131927',
          border: '1px solid rgba(255, 255, 255, 0.09)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
          borderRadius: 14,
        },
        elevation1: {
          border: '1px solid rgba(16, 185, 129, 0.25)',
          boxShadow: '0 0 25px rgba(16, 185, 129, 0.12)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 700,
          padding: '10px 20px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 6px 24px rgba(16, 185, 129, 0.55)',
            background: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(16, 185, 129, 0.4)',
          color: '#34d399',
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          '&:hover': {
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.18)',
            boxShadow: '0 0 16px rgba(16, 185, 129, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#0a0d16',
            borderRadius: 10,
            color: '#f8fafc',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.875rem',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.12)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(16, 185, 129, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#10b981',
              borderWidth: '1.5px',
              boxShadow: '0 0 16px rgba(16, 185, 129, 0.25)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#94a3b8',
            '&.Mui-focused': {
              color: '#10b981',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '12px 16px',
        },
        head: {
          backgroundColor: '#0a0d16',
          fontWeight: 800,
          color: '#34d399',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#94a3b8',
          fontWeight: 700,
          fontSize: '0.875rem',
          textTransform: 'none',
          padding: '12px 20px',
          minHeight: '48px',
          '&.Mui-selected': {
            color: '#10b981',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 20,
        },
        outlinedPrimary: {
          borderColor: 'rgba(16, 185, 129, 0.4)',
          color: '#34d399',
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        standardSuccess: {
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          color: '#34d399',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        },
        standardError: {
          backgroundColor: 'rgba(244, 63, 94, 0.12)',
          color: '#fb7185',
          border: '1px solid rgba(244, 63, 94, 0.3)',
        },
        standardInfo: {
          backgroundColor: 'rgba(139, 92, 246, 0.12)',
          color: '#c084fc',
          border: '1px solid rgba(139, 92, 246, 0.3)',
        },
      },
    },
  },
});
