import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Divider, useTheme, useMediaQuery } from '@mui/material';
import VideoCall from './VideoCall';
import AutoNotificationService, { AutoNotification } from '../../services/AutoNotificationService';
import NotificationsList from '../Notifications/NotificationsList';

const CommunicationPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<AutoNotification[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const notificationService = AutoNotificationService.getInstance();
    
    // Solicita permissão para notificações
    notificationService.requestNotificationPermission();
    
    // Inscreve-se para receber novas notificações
    const unsubscribe = notificationService.subscribe((newNotification: AutoNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
    });

    // Adiciona algumas notificações iniciais
    notificationService.addStatusNotification('Francisco está com todos os sinais vitais normais');
    notificationService.addMedicationReminder('pressão');

    // Simula alguns eventos para teste
    const interval = setInterval(() => {
      notificationService.checkForFalls({ x: 0, y: 25, z: 0 });
      notificationService.checkVitalSigns(110, { systolic: 145, diastolic: 95 });
      notificationService.checkLocation(
        { lat: -23.5505, lng: -46.6333 },
        { center: { lat: -23.5505, lng: -46.6333 }, radius: 100 }
      );
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: isMobile ? 1 : 2,
      p: isMobile ? 1 : 2,
      overflow: 'auto'
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: isMobile ? 1 : 2,
          flex: isMobile ? 'none' : 1,
          minHeight: isMobile ? 'auto' : '200px'
        }}
      >
        <Typography 
          variant={isMobile ? "subtitle1" : "h6"} 
          gutterBottom 
          sx={{ 
            fontSize: isMobile ? '1rem' : undefined,
            mb: isMobile ? 1 : 2
          }}
        >
          Comunicação com Francisco (Avô)
        </Typography>
        <VideoCall />
      </Paper>

      <Paper 
        elevation={3} 
        sx={{ 
          p: isMobile ? 1 : 2,
          flex: 1,
          overflow: 'auto',
          maxHeight: isMobile ? 'calc(100vh - 300px)' : undefined
        }}
      >
        <Typography 
          variant={isMobile ? "subtitle1" : "h6"} 
          gutterBottom
          sx={{ 
            fontSize: isMobile ? '1rem' : undefined,
            mb: isMobile ? 1 : 2
          }}
        >
          Alertas e Notificações
        </Typography>
        <Divider sx={{ my: isMobile ? 0.5 : 1 }} />
        <NotificationsList 
          notifications={notifications}
          onNotificationRead={handleNotificationRead}
          variant="panel"
        />
      </Paper>
    </Box>
  );
};

export default CommunicationPanel; 