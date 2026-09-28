import { createTheme } from '@mui/material/styles';

export const lightMuiTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7c3aed',
      light: '#a78bfa',
      dark: '#6d28d9',
    },
    success: {
      main: '#059669',
      light: '#34d399',
    },
    warning: {
      main: '#d97706',
      light: '#fbbf24',
    },
    error: {
      main: '#dc2626',
      light: '#f87171',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      disabled: '#94a3b8',
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontWeight: 800, color: '#0f172a' },
    h2: { fontWeight: 800, color: '#0f172a' },
    h3: { fontWeight: 800, color: '#0f172a' },
    h4: { fontWeight: 800, color: '#0f172a' },
    h5: { fontWeight: 700, color: '#0f172a' },
    h6: { fontWeight: 700, color: '#0f172a' },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f8fafc',
          color: '#0f172a',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          borderRadius: 14,
        },
        elevation1: {
          border: '1px solid #cbd5e1',
          boxShadow: '0 10px 30px rgba(37, 99, 235, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 700,
          padding: '10px 20px',
          transition: 'all 0.2s ease',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 6px 20px rgba(37, 99, 235, 0.45)',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          },
        },
        outlinedPrimary: {
          borderColor: '#cbd5e1',
          color: '#2563eb',
          backgroundColor: '#ffffff',
          '&:hover': {
            borderColor: '#2563eb',
            backgroundColor: '#eff6ff',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            borderRadius: 10,
            color: '#0f172a',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.875rem',
            '& fieldset': {
              borderColor: '#cbd5e1',
            },
            '&:hover fieldset': {
              borderColor: '#94a3b8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2563eb',
              borderWidth: '1.5px',
              boxShadow: '0 0 10px rgba(37, 99, 235, 0.15)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#64748b',
            '&.Mui-focused': {
              color: '#2563eb',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e2e8f0',
          padding: '12px 16px',
        },
        head: {
          backgroundColor: '#f1f5f9',
          fontWeight: 800,
          color: '#334155',
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
            backgroundColor: '#f8fafc',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#64748b',
          fontWeight: 700,
          fontSize: '0.875rem',
          textTransform: 'none',
          padding: '12px 20px',
          minHeight: '48px',
          '&.Mui-selected': {
            color: '#2563eb',
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
          borderColor: '#bfdbfe',
          color: '#1d4ed8',
          backgroundColor: '#eff6ff',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        standardSuccess: {
          backgroundColor: '#ecfdf5',
          color: '#065f46',
          border: '1px solid #a7f3d0',
        },
        standardError: {
          backgroundColor: '#fef2f2',
          color: '#991b1b',
          border: '1px solid #fecaca',
        },
        standardInfo: {
          backgroundColor: '#eff6ff',
          color: '#1e40af',
          border: '1px solid #bfdbfe',
        },
      },
    },
  },
});
