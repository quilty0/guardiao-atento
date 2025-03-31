import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import VitalCard from '../VitalCard/VitalCard';

interface VitalSign {
  value: number;
  unit: string;
  description: string;
  min: number;
  max: number;
  animate?: boolean;
}

const HealthCards: React.FC = () => {
  const [vitals, setVitals] = useState({
    heartRate: {
      value: 75,
      unit: 'bpm',
      description: 'Frequência cardíaca normal',
      min: 60,
      max: 100,
      animate: true
    },
    bloodPressure: {
      value: 120,
      unit: 'mmHg',
      description: 'Pressão arterial sistólica',
      min: 90,
      max: 140
    },
    temperature: {
      value: 36.5,
      unit: '°C',
      description: 'Temperatura corporal',
      min: 36,
      max: 37.5
    },
    oxygenation: {
      value: 98,
      unit: '%',
      description: 'Saturação de oxigênio',
      min: 95,
      max: 100
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        ...prev,
        heartRate: {
          ...prev.heartRate,
          value: Math.floor(Math.random() * (100 - 60 + 1) + 60)
        },
        temperature: {
          ...prev.temperature,
          value: Number((Math.random() * (37.5 - 36.0) + 36.0).toFixed(1))
        },
        oxygenation: {
          ...prev.oxygenation,
          value: Math.floor(Math.random() * (100 - 95 + 1) + 95)
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ 
      bgcolor: 'white',
      p: 2,
      borderRadius: '20px'
    }}>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)'
        },
        gap: 2
      }}>
        <VitalCard
          type="heart"
          value={`${vitals.heartRate.value} ${vitals.heartRate.unit}`}
          title="Batimentos"
          description={vitals.heartRate.description}
          min={vitals.heartRate.min}
          max={vitals.heartRate.max}
          animate={vitals.heartRate.animate}
        />
        <VitalCard
          type="pressure"
          value={`${vitals.bloodPressure.value} ${vitals.bloodPressure.unit}`}
          title="Pressão"
          description={vitals.bloodPressure.description}
          min={vitals.bloodPressure.min}
          max={vitals.bloodPressure.max}
        />
        <VitalCard
          type="temperature"
          value={`${vitals.temperature.value} ${vitals.temperature.unit}`}
          title="Temperatura"
          description={vitals.temperature.description}
          min={vitals.temperature.min}
          max={vitals.temperature.max}
        />
        <VitalCard
          type="oxygenation"
          value={`${vitals.oxygenation.value} ${vitals.oxygenation.unit}`}
          title="Oxigenação"
          description={vitals.oxygenation.description}
          min={vitals.oxygenation.min}
          max={vitals.oxygenation.max}
        />
      </Box>
    </Box>
  );
};

export default HealthCards;
