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
  const [isAnimating, setIsAnimating] = useState(false);

  // Função para simular o movimento para fora da área
  const simulateMovementOutside = () => {
    setIsAnimating(true);
    
    // Move para fora rapidamente
    setTimeout(() => {
      setPosition({ x: 85, y: 85 }); // Move para longe do centro
      setIsInsideArea(false);
    }, 500);

    // Volta para dentro após 3 segundos
    setTimeout(() => {
      setPosition({ x: 50, y: 50 }); // Volta ao centro
      setIsInsideArea(true);
      setIsAnimating(false);
    }, 3000);
  };

  useEffect(() => {
    // Inicia a simulação a cada 15 segundos se não estiver animando
    const interval = setInterval(() => {
      if (!isAnimating) {
        simulateMovementOutside();
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Movimento suave quando dentro da área
  useEffect(() => {
    let movementInterval: NodeJS.Timeout;

    if (!isAnimating && isInsideArea) {
      movementInterval = setInterval(() => {
        setPosition(prev => {
          const newX = prev.x + (Math.random() * 0.5 - 0.25);
          const newY = prev.y + (Math.random() * 0.5 - 0.25);
          
          // Mantém próximo ao centro
          return {
            x: Math.max(45, Math.min(55, newX)),
            y: Math.max(45, Math.min(55, newY))
          };
        });
      }, 1000);
    }

    return () => clearInterval(movementInterval);
  }, [isAnimating, isInsideArea]);

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
          mb: 2,
          overflow: 'hidden'
        }}
      >
        {/* Círculo de geocerca */}
        <Box
          sx={{
            width: '60%',
            height: '60%',
            border: '2px solid #3498DB',
            borderRadius: '50%',
            opacity: 0.5,
            position: 'absolute'
          }}
        />
        
        {/* Marcador do idoso */}
        <LocationOn
          sx={{
            color: isInsideArea ? '#2ECC71' : '#E74C3C',
            fontSize: 32,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            position: 'absolute',
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.8s ease-in-out'
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
        <Typography 
          variant="body2" 
          sx={{ 
            color: isInsideArea ? 'success.main' : 'error.main',
            fontWeight: 'bold',
            transition: 'color 0.3s ease'
          }}
        >
          Status: {isInsideArea ? 'Dentro da área segura' : 'FORA DA ÁREA SEGURA!'}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block', mt: 1 }}>
          Mapa Estático - Geocerca: 1km de raio
        </Typography>
      </Box>
    </Paper>
  );
};

export default LocationMap;
