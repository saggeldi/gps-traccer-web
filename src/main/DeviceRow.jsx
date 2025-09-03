import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import {
  IconButton, Tooltip, Avatar, Typography, Card, CardContent, CardActions, Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReplayIcon from '@mui/icons-material/Replay';
import PublishIcon from '@mui/icons-material/Publish';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PlaceIcon from '@mui/icons-material/Place';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import Battery60Icon from '@mui/icons-material/Battery60';
import BatteryCharging60Icon from '@mui/icons-material/BatteryCharging60';
import Battery20Icon from '@mui/icons-material/Battery20';
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import ErrorIcon from '@mui/icons-material/Error';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { devicesActions } from '../store';
import {
  formatAlarm, formatBoolean, formatPercentage, formatStatus, getStatusColor,
} from '../common/util/formatter';
import { useTranslation } from '../common/components/LocalizationProvider';
import { mapIconKey, mapIcons } from '../map/core/preloadImages';
import EngineIcon from '../resources/images/data/engine.svg?react';
import { useAttributePreference } from '../common/util/preferences';

dayjs.extend(relativeTime);

const useStyles = makeStyles()((theme) => ({
  card: {
    margin: theme.spacing(1),
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
    },
  },
  selectedCard: {
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: `0 4px 16px ${theme.palette.primary.main}40`,
  },
  cardContent: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  deviceHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  icon: {
    width: '32px',
    height: '32px',
    filter: 'brightness(0) invert(1)',
  },
  deviceInfo: {
    flex: 1,
  },
  speedChip: {
    fontSize: '0.75rem',
    height: '24px',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  actionButtons: {
    padding: theme.spacing(0.5, 1),
    display: 'flex',
    justifyContent: 'space-around',
  },
  actionButton: {
    padding: theme.spacing(0.5),
  },
  success: {
    color: theme.palette.success.main,
  },
  warning: {
    color: theme.palette.warning.main,
  },
  error: {
    color: theme.palette.error.main,
  },
  neutral: {
    color: theme.palette.text.disabled,
  },
}));

const DeviceRow = ({ data, index, style }) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const t = useTranslation();

  const selectedDeviceId = useSelector((state) => state.devices.selectedId);

  const item = data[index];
  const position = useSelector((state) => state.session.positions[item.id]);

  const devicePrimary = useAttributePreference('devicePrimary', 'name');
  const deviceSecondary = useAttributePreference('deviceSecondary', '');

  const getSpeed = () => {
    if (position && position.speed !== undefined) {
      return Math.round(position.speed * 1.852); // Convert knots to km/h
    }
    return 0;
  };

  const getStatusText = () => {
    if (item.status === 'online' || !item.lastUpdate) {
      return formatStatus(item.status, t);
    }
    return dayjs(item.lastUpdate).fromNow();
  };

  const handleCardClick = () => {
    dispatch(devicesActions.selectId(item.id));
  };

  const handleLiveTrack = (e) => {
    e.stopPropagation();
    dispatch(devicesActions.selectId(item.id));
    navigate('/');
  };

  const handlePlayback = (e) => {
    e.stopPropagation();
    navigate(`/replay?deviceId=${item.id}`);
  };

  const handleCommands = (e) => {
    e.stopPropagation();
    navigate(`/settings/device/${item.id}/command`);
  };

  const handleGeofence = (e) => {
    e.stopPropagation();
    navigate(`/settings/device/${item.id}/connections`);
  };

  return (
    <div style={style}>
      <Card 
        className={`${classes.card} ${selectedDeviceId === item.id ? classes.selectedCard : ''}`}
        onClick={handleCardClick}
      >
        <CardContent className={classes.cardContent}>
          <div className={classes.deviceHeader}>
            <Avatar>
              <img className={classes.icon} src={mapIcons[mapIconKey(item.category)]} alt="" />
            </Avatar>
            <div className={classes.deviceInfo}>
              <Typography variant="subtitle1" noWrap>
                {item[devicePrimary]}
              </Typography>
              <Typography variant="body2" color="textSecondary" noWrap>
                {deviceSecondary && item[deviceSecondary] && `${item[deviceSecondary]} • `}
                <span className={classes[getStatusColor(item.status)]}>{getStatusText()}</span>
              </Typography>
            </div>
            <Chip 
              label={`${getSpeed()} km/h`}
              size="small"
              className={classes.speedChip}
              color={getSpeed() > 0 ? 'primary' : 'default'}
            />
          </div>
          
          {position && (
            <div className={classes.statusRow}>
              {position.attributes.hasOwnProperty('alarm') && (
                <Tooltip title={`${t('eventAlarm')}: ${formatAlarm(position.attributes.alarm, t)}`}>
                  <ErrorIcon fontSize="small" className={classes.error} />
                </Tooltip>
              )}
              {position.attributes.hasOwnProperty('ignition') && (
                <Tooltip title={`${t('positionIgnition')}: ${formatBoolean(position.attributes.ignition, t)}`}>
                  {position.attributes.ignition ? (
                    <EngineIcon width={16} height={16} className={classes.success} />
                  ) : (
                    <EngineIcon width={16} height={16} className={classes.neutral} />
                  )}
                </Tooltip>
              )}
              {position.attributes.hasOwnProperty('batteryLevel') && (
                <Tooltip title={`${t('positionBatteryLevel')}: ${formatPercentage(position.attributes.batteryLevel)}`}>
                  {(position.attributes.batteryLevel > 70 && (
                    position.attributes.charge
                      ? (<BatteryChargingFullIcon fontSize="small" className={classes.success} />)
                      : (<BatteryFullIcon fontSize="small" className={classes.success} />)
                  )) || (position.attributes.batteryLevel > 30 && (
                    position.attributes.charge
                      ? (<BatteryCharging60Icon fontSize="small" className={classes.warning} />)
                      : (<Battery60Icon fontSize="small" className={classes.warning} />)
                  )) || (
                    position.attributes.charge
                      ? (<BatteryCharging20Icon fontSize="small" className={classes.error} />)
                      : (<Battery20Icon fontSize="small" className={classes.error} />)
                  )}
                </Tooltip>
              )}
            </div>
          )}
        </CardContent>
        
        <CardActions className={classes.actionButtons}>
          <Tooltip title={t('deviceLiveTrack') || 'Live Track'}>
            <IconButton 
              className={classes.actionButton}
              onClick={handleLiveTrack}
              size="small"
            >
              <MyLocationIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={t('reportReplay')}>
            <IconButton 
              className={classes.actionButton}
              onClick={handlePlayback}
              size="small"
              disabled={!position}
            >
              <ReplayIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={t('commandTitle')}>
            <IconButton 
              className={classes.actionButton}
              onClick={handleCommands}
              size="small"
            >
              <PublishIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={t('sharedGeofences')}>
            <IconButton 
              className={classes.actionButton}
              onClick={handleGeofence}
              size="small"
            >
              <PlaceIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </div>
  );
};

export default DeviceRow;
