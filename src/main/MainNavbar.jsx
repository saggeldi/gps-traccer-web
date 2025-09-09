import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Badge,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TuneIcon from '@mui/icons-material/Tune';
import ExploreIcon from '@mui/icons-material/Explore';
import LogoutIcon from '@mui/icons-material/Logout';

import { sessionActions } from '../store';
import { useTranslation } from '../common/components/LocalizationProvider';
import { nativePostMessage } from '../common/components/NativeInterface';
import { useRestriction } from '../common/util/permissions';

const useStyles = makeStyles()((theme) => ({
  appBar: {
    height: '70px',
    width: '100%',
    zIndex: 4,
    borderRadius: "0",
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(26, 29, 58, 0.85)' 
      : 'rgba(248, 250, 252, 0.85)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderBottom: theme.palette.mode === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 32px rgba(0, 0, 0, 0.3)'
      : '0 8px 32px rgba(0, 0, 0, 0.12)',
    transition: 'all 0.3s ease-in-out',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)'
        : 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(5, 150, 105, 0.03) 100%)',
      borderRadius: '0px',
      pointerEvents: 'none',
    },
  },
  toolbar: {
    minHeight: '70px',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: 'flex',
    borderRadius: '0px',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  logo: {
    height: '40px',
    cursor: 'pointer',
    '& img, & svg': {
      height: '100%',
      width: 'auto',
      margin: 0,
    },
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(0.5),
    borderRadius: '16px',
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(255, 255, 255, 0.2)',
  },
  profileButton: {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(99, 102, 241, 0.1)'
      : 'rgba(79, 70, 229, 0.08)',
    borderRadius: '12px',
    padding: theme.spacing(1),
    transition: 'all 0.3s ease-in-out',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(99, 102, 241, 0.2)'
      : '1px solid rgba(79, 70, 229, 0.15)',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(99, 102, 241, 0.2)'
        : 'rgba(79, 70, 229, 0.15)',
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 8px 25px rgba(99, 102, 241, 0.3)'
        : '0 8px 25px rgba(79, 70, 229, 0.25)',
      backdropFilter: 'blur(20px)',
    },
  },
  navButton: {
    borderRadius: '12px',
    padding: theme.spacing(1),
    transition: 'all 0.3s ease-in-out',
    margin: theme.spacing(0, 0.5),
    '&:hover': {
      transform: 'translateY(-2px) scale(1.05)',
      backdropFilter: 'blur(20px)',
    },
  },
  mapButton: {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(79, 70, 229, 0.1)'
      : 'rgba(79, 70, 229, 0.08)',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(79, 70, 229, 0.2)'
      : '1px solid rgba(79, 70, 229, 0.15)',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(79, 70, 229, 0.2)'
        : 'rgba(79, 70, 229, 0.15)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 8px 25px rgba(79, 70, 229, 0.3)'
        : '0 8px 25px rgba(79, 70, 229, 0.25)',
    },
  },
  reportsButton: {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(168, 85, 247, 0.1)'
      : 'rgba(168, 85, 247, 0.08)',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(168, 85, 247, 0.2)'
      : '1px solid rgba(168, 85, 247, 0.15)',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(168, 85, 247, 0.2)'
        : 'rgba(168, 85, 247, 0.15)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 8px 25px rgba(168, 85, 247, 0.3)'
        : '0 8px 25px rgba(168, 85, 247, 0.25)',
    },
  },
  settingsButton: {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(34, 197, 94, 0.1)'
      : 'rgba(34, 197, 94, 0.08)',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(34, 197, 94, 0.2)'
      : '1px solid rgba(34, 197, 94, 0.15)',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(34, 197, 94, 0.2)'
        : 'rgba(34, 197, 94, 0.15)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 8px 25px rgba(34, 197, 94, 0.3)'
        : '0 8px 25px rgba(34, 197, 94, 0.25)',
    },
  },
}));

const MainNavbar = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const t = useTranslation();

  const user = useSelector((state) => state.session.user);
  const readonly = useSelector((state) => state.session.user?.readonly);
  const socket = useSelector((state) => state.session.socket);
  const disableReports = useRestriction('disableReports');
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleAccount = () => {
    setProfileAnchorEl(null);
    setAccountAnchorEl(null);
    navigate(`/settings/user/${user.id}`);
  };

  const handleAccountClick = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAccountAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    setProfileAnchorEl(null);

    const notificationToken = window.localStorage.getItem('notificationToken');
    if (notificationToken && !user.readonly) {
      window.localStorage.removeItem('notificationToken');
      const tokens = user.attributes.notificationTokens?.split(',') || [];
      if (tokens.includes(notificationToken)) {
        const updatedUser = {
          ...user,
          attributes: {
            ...user.attributes,
            notificationTokens: tokens.length > 1 ? tokens.filter((it) => it !== notificationToken).join(',') : undefined,
          },
        };
        await fetch(`/api/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });
      }
    }

    await fetch('/api/session', { method: 'DELETE' });
    nativePostMessage('logout');
    navigate('/login');
    dispatch(sessionActions.updateUser(null));
  };

  return (
    <>
      {desktop && (
        <Box 
          sx={{
            position: "fixed",
            top: 14,
            right: 0,
            zIndex: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            padding: 1,
            minWidth: "360px",
            marginRight: "12px",
            borderRadius: '16px',
            backgroundColor: theme.palette.mode === 'dark'
              ? 'rgb(0,0,0)'
              : 'rgb(255,255,255)',
            backdropFilter: 'blur(10px)',
            border: theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <IconButton
            className={`${classes.navButton} ${classes.mapButton}`}
            onClick={() => handleNavigation('/')}
            color="inherit"
            size="large"
            title={t('mapTitle')}
          >
            <Badge color="error" variant="dot" overlap="circular" invisible={socket !== false}>
              <ExploreIcon />
            </Badge>
          </IconButton>
          {!disableReports && (
            <IconButton
              className={`${classes.navButton} ${classes.reportsButton}`}
              onClick={() => handleNavigation('/reports/combined')}
              color="inherit"
              size="large"
              title={t('reportTitle')}
            >
              <AssessmentIcon />
            </IconButton>
          )}
          <IconButton
            className={`${classes.navButton} ${classes.settingsButton}`}
            onClick={() => handleNavigation('/settings/preferences')}
            color="inherit"
            size="large"
            title={t('settingsTitle')}
          >
            <TuneIcon />
          </IconButton>
          {readonly ? (
            <IconButton
              className={classes.profileButton}
              onClick={handleLogout}
              color="inherit"
              size="large"
              title={t('loginLogout')}
            >
              <LogoutIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.profileButton}
              onClick={handleAccountClick}
              color="inherit"
              size="large"
              title={t('settingsUser')}
            >
              <AccountCircleIcon />
            </IconButton>
          )}
        </Box>
      )}

      {!desktop && (
        <IconButton
          className={classes.profileButton}
          onClick={handleProfileClick}
          color="inherit"
          size="medium"
        >
          <AccountCircleIcon />
        </IconButton>
      )}

      {/* Profile Menu */}
      <Menu 
        anchorEl={profileAnchorEl} 
        open={Boolean(profileAnchorEl)} 
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {!readonly && (
          <MenuItem onClick={handleAccount}>
            <Typography color="textPrimary">{t('settingsUser')}</Typography>
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>
          <Typography color="error">{t('loginLogout')}</Typography>
        </MenuItem>
      </Menu>

      {/* Account Menu for Desktop */}
      <Menu 
        anchorEl={accountAnchorEl} 
        open={Boolean(accountAnchorEl)} 
        onClose={handleAccountClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleAccount}>
          <Typography color="textPrimary">{t('settingsUser')}</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography color="error">{t('loginLogout')}</Typography>
        </MenuItem>
      </Menu>

    </>
  );
};

export default MainNavbar;