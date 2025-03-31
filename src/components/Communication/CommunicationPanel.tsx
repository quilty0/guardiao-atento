import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import VideoCall from './VideoCall';
import AutoNotificationService, { AutoNotification } from '../../services/AutoNotificationService';
import NotificationsList from '../Notifications/NotificationsList';

const CommunicationPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<AutoNotification[]>([]);

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
      // Simula uma queda
      notificationService.checkForFalls({ x: 0, y: 25, z: 0 });

      // Simula pressão alta
      notificationService.checkVitalSigns(110, { systolic: 145, diastolic: 95 });

      // Simula saída da área segura
      notificationService.checkLocation(
        { lat: -23.5505, lng: -46.6333 },
        { center: { lat: -23.5505, lng: -46.6333 }, radius: 100 } // Reduzido o raio para 100m para forçar alerta
      );
    }, 5000); // Reduzido para 5 segundos para teste

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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Paper elevation={3} sx={{ p: 2, flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          Comunicação com Francisco (Avô)
        </Typography>
        <VideoCall />
      </Paper>

      <Paper elevation={3} sx={{ p: 2, flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          Alertas e Notificações
        </Typography>
        <Divider sx={{ my: 1 }} />
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