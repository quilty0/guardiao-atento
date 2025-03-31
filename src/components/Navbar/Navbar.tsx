import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  DirectionsWalk as WalkIcon,
  CheckCircle as CheckIcon,
  LocalHospital as MedicineIcon,
  Person as PersonIcon,
  Notifications as NotificationsSettingsIcon,
  Security as SecurityIcon,
  Help as HelpIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import ElderlyIcon from '@mui/icons-material/Elderly';
import UserProfile from '../UserProfile';

const initialNotifications = [
  {
    id: 1,
    type: 'status',
    title: 'Status Normal',
    message: 'Francisco está com todos os sinais vitais normais',
    time: '2 min atrás',
    icon: CheckIcon,
    read: false
  },
  {
    id: 2,
    type: 'medicine',
    title: 'Lembrete de Medicação',
    message: 'Hora do remédio para pressão',
    time: '15 min atrás',
    icon: MedicineIcon,
    read: false
  },
  {
    id: 3,
    type: 'activity',
    title: 'Atividade Física',
    message: 'Francisco completou sua caminhada diária',
    time: '1 hora atrás',
    icon: WalkIcon,
    read: false
  }
];

const settingsOptions = [
  { icon: PersonIcon, text: 'Perfil', onClick: () => console.log('Perfil') },
  { icon: NotificationsSettingsIcon, text: 'Notificações', onClick: () => console.log('Notificações') },
  { icon: SecurityIcon, text: 'Segurança', onClick: () => console.log('Segurança') },
  { icon: HelpIcon, text: 'Ajuda', onClick: () => console.log('Ajuda') }
];

const mockUserProfile = {
  name: "Maria Silva",
  relationship: "Irmã",
  email: "maria.silva@email.com",
  phone: "(86) 99999-9999",
  photoUrl: "https://i.pravatar.cc/300"
};

const Navbar: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  const handleShowAllNotifications = () => {
    setShowAllNotifications(true);
    handleNotificationClose();
  };

  const handleCloseAllNotifications = () => {
    setShowAllNotifications(false);
  };

  const handleNotificationRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    handleSettingsClose();
  };

  const handleProfileClose = () => {
    setShowProfile(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ 
        bgcolor: '#2C3E50',
        borderRadius: 0,
        boxShadow: 'none'
      }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <ElderlyIcon sx={{ fontSize: 32 }} />
            <Typography variant="h6" component="div">
              Guardião Atento
            </Typography>
          </Box>
          <IconButton
            color="inherit"
            onClick={handleNotificationClick}
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton 
            color="inherit"
            onClick={handleSettingsClick}
          >
            <SettingsIcon />
          </IconButton>

          {/* Menu de Notificações */}
          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationClose}
            sx={{ mt: 2 }}
          >
            <Box sx={{ width: 320, maxHeight: 400, overflow: 'auto' }}>
              <Typography variant="h6" sx={{ p: 2, pb: 1, bgcolor: '#2C3E50', color: 'white' }}>
                Notificações
              </Typography>
              <Divider />
              <List>
                {notifications.map((notification) => (
                  <ListItem 
                    key={notification.id} 
                    sx={{
                      py: 1,
                      cursor: 'pointer',
                      bgcolor: notification.read ? 'transparent' : 'rgba(44, 62, 80, 0.05)',
                      '&:hover': {
                        bgcolor: 'rgba(44, 62, 80, 0.1)'
                      }
                    }}
                    onClick={() => handleNotificationRead(notification.id)}
                  >
                    <ListItemIcon>
                      <notification.icon color={notification.type === 'status' ? 'success' : 'primary'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={notification.title}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {notification.message}
                          </Typography>
                          <br />
                          <Typography component="span" variant="caption" color="text.secondary">
                            {notification.time}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <Box sx={{ p: 1, bgcolor: '#2C3E50' }}>
                <Typography
                  variant="body2"
                  color="white"
                  align="center"
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8
                    }
                  }}
                  onClick={handleShowAllNotifications}
                >
                  Ver todas as notificações
                </Typography>
              </Box>
            </Box>
          </Menu>

          {/* Menu de Configurações */}
          <Menu
            anchorEl={settingsAnchorEl}
            open={Boolean(settingsAnchorEl)}
            onClose={handleSettingsClose}
            sx={{ mt: 2 }}
          >
            <MenuItem onClick={handleProfileClick}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <NotificationsSettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Notificações" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <SecurityIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Segurança" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <HelpIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Ajuda" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Diálogo de Perfil */}
      <Dialog
        open={showProfile}
        onClose={handleProfileClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Perfil do Cuidador</Typography>
            <IconButton onClick={handleProfileClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <UserProfile {...mockUserProfile} />
        </DialogContent>
      </Dialog>

      {/* Dialog para todas as notificações */}
      <Dialog
        open={showAllNotifications}
        onClose={handleCloseAllNotifications}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: '#2C3E50', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotificationsIcon />
            <Typography variant="h6">Todas as Notificações</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <List>
            {[...notifications, ...notifications].map((notification, index) => (
              <React.Fragment key={`${notification.id}-${index}`}>
                <ListItem
                  sx={{ 
                    cursor: 'pointer',
                    bgcolor: notification.read ? 'transparent' : 'rgba(44, 62, 80, 0.05)',
                    '&:hover': {
                      bgcolor: 'rgba(44, 62, 80, 0.1)'
                    }
                  }}
                  onClick={() => handleNotificationRead(notification.id)}
                >
                  <ListItemIcon>
                    <notification.icon color={notification.type === 'status' ? 'success' : 'primary'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={notification.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {notification.message}
                        </Typography>
                        <br />
                        <Typography component="span" variant="caption" color="text.secondary">
                          {notification.time}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar; 