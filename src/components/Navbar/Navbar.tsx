import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  Drawer
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Notifications as NotificationsSettingsIcon,
  Security as SecurityIcon,
  Help as HelpIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Analytics as AnalyticsIcon,
  Call as CallIcon
} from '@mui/icons-material';
import ElderlyIcon from '@mui/icons-material/Elderly';
import UserProfile from '../UserProfile';
import NotificationsList from '../Notifications/NotificationsList';
import AutoNotificationService, { AutoNotification } from '../../services/AutoNotificationService';

interface NavbarProps {
  onNavigate: (index: number) => void;
  currentTab: number;
}

const mockUserProfile = {
  name: "Maria Silva",
  relationship: "Irmã",
  email: "maria.silva@email.com",
  phone: "(86) 99999-9999",
  photoUrl: "https://i.pravatar.cc/300"
};

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentTab }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState<AutoNotification[]>([]);

  useEffect(() => {
    const notificationService = AutoNotificationService.getInstance();
    
    const unsubscribe = notificationService.subscribe((notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    notificationService.addStatusNotification('Francisco está com todos os sinais vitais normais');
    notificationService.addMedicationReminder('pressão');
    notificationService.addActivityNotification('Francisco completou sua caminhada diária');

    return () => unsubscribe();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleNavigate = (index: number) => {
    onNavigate(index);
    handleMenuClose();
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    handleSettingsClose();
  };

  const handleProfileClose = () => {
    setShowProfile(false);
  };

  const handleCloseNotifications = () => {
    setIsNotificationsOpen(false);
  };

  const handleNotificationRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  return (
    <>
      <AppBar position="static" sx={{ 
        bgcolor: '#2C3E50',
        borderRadius: 0,
        boxShadow: 'none'
      }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <ElderlyIcon sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h6" component="div">
              Guardião Atento
            </Typography>
          </Box>

          <IconButton
            color="inherit"
            onClick={() => setIsNotificationsOpen(true)}
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
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        sx={{ mt: 2 }}
      >
        <MenuItem onClick={() => handleNavigate(0)} selected={currentTab === 0}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Principal" />
        </MenuItem>
        <MenuItem onClick={() => handleNavigate(1)} selected={currentTab === 1}>
          <ListItemIcon>
            <AnalyticsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Análise de Comportamento" />
        </MenuItem>
        <MenuItem onClick={() => handleNavigate(2)} selected={currentTab === 2}>
          <ListItemIcon>
            <CallIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Comunicação" />
        </MenuItem>
      </Menu>

      <Drawer
        anchor="right"
        open={isNotificationsOpen}
        onClose={handleCloseNotifications}
        PaperProps={{
          sx: { width: 350 }
        }}
      >
        <NotificationsList 
          notifications={notifications}
          variant="sidebar"
          onClose={handleCloseNotifications}
          onNotificationRead={handleNotificationRead}
        />
      </Drawer>

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
    </>
  );
};

export default Navbar; 