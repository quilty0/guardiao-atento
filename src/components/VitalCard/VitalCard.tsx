import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Favorite, DeviceThermostat, WaterDrop, MonitorHeart } from '@mui/icons-material';

interface VitalCardProps {
  type: 'heart' | 'pressure' | 'temperature' | 'oxygenation';
  value: string;
  title: string;
  description: string;
  min: number;
  max: number;
  animate?: boolean;
}

const getStatusColor = (value: string, min: number, max: number): string => {
  const numValue = parseFloat(value);
  if (numValue < min) return '#E74C3C';
  if (numValue > max) return '#E74C3C';
  return '#2ECC71';
};

const VitalCard: React.FC<VitalCardProps> = ({ type, value, title, description, min, max, animate }) => {
  const getIcon = () => {
    switch (type) {
      case 'heart':
        return <Favorite sx={{ fontSize: 40, color: '#E74C3C' }} />;
      case 'pressure':
        return <WaterDrop sx={{ fontSize: 40, color: '#2C3E50' }} />;
      case 'temperature':
        return <DeviceThermostat sx={{ fontSize: 40, color: '#F39C12' }} />;
      case 'oxygenation':
        return <MonitorHeart sx={{ fontSize: 40, color: '#27AE60' }} />;
    }
  };

  const statusColor = getStatusColor(value, min, max);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          color: statusColor,
          animation: animate ? 'pulse 1.5s infinite' : 'none'
        }}
      >
        {getIcon()}
      </Box>
      <Typography variant="h6" component="div" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div" sx={{ color: statusColor, fontWeight: 'bold' }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
        {description}
      </Typography>
      <Box sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">
          Min: {min}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Max: {max}
        </Typography>
      </Box>
    </Paper>
  );
};

export default VitalCard; 