export default {
  MuiUseMediaQuery: {
    defaultProps: {
      noSsr: true,
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        borderRadius: '12px',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
        '&.Mui-focused': {
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        },
      }),
      notchedOutline: {
        borderRadius: '12px',
        borderWidth: '2px',
        transition: 'all 0.2s ease-in-out',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
          '&.Mui-focused': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          },
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: () => ({
        borderRadius: '12px',
        textTransform: 'none',
        fontWeight: '600',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        },
        '&:active': {
          transform: 'translateY(0)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        },
      }),
      sizeMedium: {
        height: '40px',
        padding: '8px 24px',
      },
      contained: ({ theme }) => ({
        background: theme.palette.mode === 'dark' 
          ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark || theme.palette.primary.main} 100%)`
          : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark || theme.palette.primary.main} 100%)`,
        '&:hover': {
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${theme.palette.primary.light || theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`
            : `linear-gradient(135deg, ${theme.palette.primary.light || theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`,
        },
      }),
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: '16px',
        transition: 'all 0.2s ease-in-out',
        border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        },
      }),
      elevation1: {
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      },
      elevation2: {
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      },
      elevation3: {
        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
      },
      elevation4: {
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
      },
      elevation8: {
        boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: '16px',
        transition: 'all 0.2s ease-in-out',
        border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 35px rgba(0,0,0,0.15)',
        },
      }),
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
  MuiFormControl: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
        },
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: '12px !important',
        marginBottom: '8px',
        border: theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
        },
        '&:before': {
          display: 'none',
        },
      }),
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
        '&.Mui-expanded': {
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
        },
      },
    },
  },
  MuiSnackbar: {
    defaultProps: {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    },
    styleOverrides: {
      root: {
        '& .MuiSnackbarContent-root': {
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        },
      },
    },
  },
  MuiTooltip: {
    defaultProps: {
      enterDelay: 500,
      enterNextDelay: 500,
    },
    styleOverrides: {
      tooltip: {
        borderRadius: '8px',
        fontSize: '0.75rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: theme.direction === 'rtl' ? '16px 0 0 16px' : '0 16px 16px 0',
        border: 'none',
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
      }),
    },
  },
};
