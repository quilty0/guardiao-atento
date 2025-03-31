import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { LocationOn } from '@mui/icons-material';

const Header: React.FC = () => {
  return (
    <Box sx={{ 
      p: 3,
      borderRadius: '20px',
      background: 'linear-gradient(90deg, #2C3E50 0%, #3498DB 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <Typography variant="h6">Monitorando</Typography>
      <Typography variant="h4" fontWeight="bold">Francisco Raimundo</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Chip label="Vivo" color="success" sx={{ borderRadius: '12px' }} />
        <Chip label="Alerta" color="warning" sx={{ borderRadius: '12px' }} />
        <Chip label="Emergência" color="error" sx={{ borderRadius: '12px' }} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.8 }}>
        <LocationOn sx={{ fontSize: 16 }} />
        <Typography variant="body2">
          Teresina, PI
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7 }}>
        Última atualização: há 5 minutos
      </Typography>
    </Box>
  );
};

export default Header;
