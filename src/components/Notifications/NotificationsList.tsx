import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Badge,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Warning,
  Error,
  Info,
  NotificationsActive,
  MedicalServices,
  DirectionsWalk,
  CheckCircle,
  Close as CloseIcon
} from '@mui/icons-material';
import { AutoNotification } from '../../services/AutoNotificationService';

interface NotificationsListProps {
  notifications: AutoNotification[];
  variant?: 'sidebar' | 'panel';
  onClose?: () => void;
  onNotificationRead?: (id: string) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  variant = 'panel',
  onClose,
  onNotificationRead
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getIcon = (type: string, severity: string) => {
    if (type === 'medication') return <MedicalServices color="info" />;
    if (type === 'activity') return <DirectionsWalk color="success" />;
    if (type === 'status' && severity === 'low') return <CheckCircle color="success" />;

    switch (severity) {
      case 'high':
        return <Error color="error" />;
      case 'medium':
        return <Warning color="warning" />;
      default:
        return <Info color="info" />;
    }
  };

  const getNotificationColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'error.main';
      case 'medium':
        return 'warning.main';
      case 'low':
        return 'success.main';
      default:
        return 'info.main';
    }
  };

  const handleNotificationClick = (notification: AutoNotification) => {
    if (!notification.read && onNotificationRead) {
      onNotificationRead(notification.id);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Agora';
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;
    if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
    }
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} dia${days > 1 ? 's' : ''} atrás`;
  };

  if (variant === 'sidebar') {
    return (
      <Box>
        <Box sx={{ 
          p: 2, 
          bgcolor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsActive color="primary" />
            </Badge>
            <Typography variant="h6">Notificações</Typography>
          </Box>
          {onClose && (
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        <Divider />
        <List sx={{ maxHeight: 'calc(100vh - 64px)', overflow: 'auto' }}>
          {notifications.map((notification) => (
            <ListItem 
              key={notification.id}
              sx={{
                py: 2,
                opacity: notification.read ? 0.7 : 1,
                borderBottom: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
              onClick={() => handleNotificationClick(notification)}
            >
              <ListItemIcon>
                {getIcon(notification.type, notification.severity)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: notification.read ? 'normal' : 'bold',
                      color: notification.severity === 'high' ? 'error.main' : 'text.primary'
                    }}
                  >
                    {notification.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" component="span">
                      {notification.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {formatTimeAgo(notification.timestamp)}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
          {notifications.length === 0 && (
            <ListItem>
              <ListItemText
                primary={
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    align="center"
                  >
                    Nenhuma notificação
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Box>
    );
  }

  return (
    <List sx={{ 
      overflow: 'auto',
      p: 0,
      '& .MuiListItem-root': {
        mb: isMobile ? 0.5 : 1,
        p: isMobile ? 1 : 2,
        bgcolor: 'background.paper',
        borderRadius: 1
      }
    }}>
      {notifications.map((notification) => (
        <ListItem 
          key={notification.id}
          sx={{
            border: 1,
            borderColor: getNotificationColor(notification.severity),
            opacity: notification.read ? 0.7 : 1,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'action.hover'
            },
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center'
          }}
          onClick={() => handleNotificationClick(notification)}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            width: '100%',
            mb: isMobile ? 1 : 0
          }}>
            <ListItemIcon sx={{ minWidth: isMobile ? 36 : 56 }}>
              {getIcon(notification.type, notification.severity)}
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography 
                  variant={isMobile ? "body1" : "subtitle1"}
                  sx={{ 
                    fontWeight: notification.read ? 'normal' : 'bold',
                    color: notification.severity === 'high' ? 'error.main' : 'text.primary',
                    fontSize: isMobile ? '0.9rem' : undefined
                  }}
                >
                  {notification.title}
                </Typography>
              }
            />
          </Box>
          <Box sx={{ 
            pl: isMobile ? 4.5 : 0,
            width: '100%'
          }}>
            <Typography 
              variant="body2" 
              component="div"
              sx={{ 
                color: 'text.secondary',
                fontSize: isMobile ? '0.8rem' : undefined,
                mb: 0.5
              }}
            >
              {notification.message}
            </Typography>
            <Typography
              variant="caption"
              display="block"
              color="text.secondary"
              sx={{ 
                fontSize: isMobile ? '0.7rem' : undefined
              }}
            >
              {formatTimeAgo(notification.timestamp)}
            </Typography>
          </Box>
        </ListItem>
      ))}
      {notifications.length === 0 && (
        <ListItem>
          <ListItemText
            primary={
              <Typography 
                variant={isMobile ? "body2" : "body1"}
                color="text.secondary"
                align="center"
              >
                Nenhuma notificação
              </Typography>
            }
          />
        </ListItem>
      )}
    </List>
  );
};

export default NotificationsList; 