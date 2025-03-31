import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { LocationOn } from '@mui/icons-material';

interface LocationMapProps {
  location: string;
  lastUpdate: string;
  status: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ location, lastUpdate }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isInsideArea, setIsInsideArea] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        const newX = prev.x + (Math.random() * 2 - 1);
        const newY = prev.y + (Math.random() * 2 - 1);
        
        // Calcula a distância do centro (50%, 50%)
        const dx = newX - 50;
        const dy = newY - 50;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Verifica se está dentro da área segura (30% do raio)
        setIsInsideArea(distance <= 30);

        // Mantém o pin dentro dos limites do mapa
        return {
          x: Math.max(0, Math.min(100, newX)),
          y: Math.max(0, Math.min(100, newY))
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Localização do Idoso
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: 300,
          bgcolor: '#fff',
          borderRadius: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2
        }}
      >
        {/* Círculo de geocerca */}
        <Box
          sx={{
            width: '60%',
            height: '30%',
            border: '1px solid #3498DB',
            borderRadius: '50%',
            opacity: 0.5,
            position: 'absolute'
          }}
        />
        
        {/* Marcador central */}
        <LocationOn
          sx={{
            color: '#E74C3C',
            fontSize: 32,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            position: 'absolute',
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 1s ease-in-out'
          }}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocationOn sx={{ fontSize: 16 }} />
          Localização: {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Última atualização: {lastUpdate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {isInsideArea ? 'Dentro da área segura' : 'Fora da área segura'}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block', mt: 1 }}>
          Mapa Estático - Geocerca: 1km de raio
        </Typography>
      </Box>
    </Paper>
  );
};

export default LocationMap;
