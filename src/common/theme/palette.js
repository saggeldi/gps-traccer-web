import { grey } from '@mui/material/colors';

const validatedColor = (color) => (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color) ? color : null);

export default (server, darkMode) => ({
  mode: darkMode ? 'dark' : 'light',
  background: {
    default: darkMode ? '#0a0e27' : '#f8fafc',
    paper: darkMode ? '#1a1d3a' : '#ffffff',
  },
  primary: {
    main: validatedColor(server?.attributes?.colorPrimary) || (darkMode ? '#6366f1' : '#4f46e5'),
    light: darkMode ? '#818cf8' : '#6366f1',
    dark: darkMode ? '#4f46e5' : '#3730a3',
  },
  secondary: {
    main: validatedColor(server?.attributes?.colorSecondary) || (darkMode ? '#10b981' : '#059669'),
    light: darkMode ? '#34d399' : '#10b981',
    dark: darkMode ? '#059669' : '#047857',
  },
  neutral: {
    main: grey[500],
  },
  geometry: {
    main: '#06b6d4',
  },
  success: {
    main: darkMode ? '#10b981' : '#059669',
    light: darkMode ? '#34d399' : '#10b981',
    dark: darkMode ? '#059669' : '#047857',
  },
  warning: {
    main: darkMode ? '#f59e0b' : '#d97706',
    light: darkMode ? '#fbbf24' : '#f59e0b',
    dark: darkMode ? '#d97706' : '#b45309',
  },
  error: {
    main: darkMode ? '#ef4444' : '#dc2626',
    light: darkMode ? '#f87171' : '#ef4444',
    dark: darkMode ? '#dc2626' : '#b91c1c',
  },
  info: {
    main: darkMode ? '#3b82f6' : '#2563eb',
    light: darkMode ? '#60a5fa' : '#3b82f6',
    dark: darkMode ? '#2563eb' : '#1d4ed8',
  },
  text: {
    primary: darkMode ? '#f1f5f9' : '#1e293b',
    secondary: darkMode ? '#94a3b8' : '#64748b',
    disabled: darkMode ? '#64748b' : '#94a3b8',
  },
  divider: darkMode ? 'rgba(148, 163, 184, 0.12)' : 'rgba(100, 116, 139, 0.12)',
  action: {
    hover: darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
    selected: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    disabled: darkMode ? 'rgba(255, 255, 255, 0.26)' : 'rgba(0, 0, 0, 0.26)',
    disabledBackground: darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
  },
});
