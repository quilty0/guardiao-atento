import React from 'react';
import { Paper, Typography, Box, Chip, Stack } from '@mui/material';
import { Check as CheckIcon, Warning as WarningIcon, Error as ErrorIcon } from '@mui/icons-material';

interface PatientStatusProps {
  name: string;
  location: string;
  lastUpdate: string;
  vitalsStatus: 'normal' | 'warning' | 'critical';
  alertnessStatus: 'awake' | 'resting' | 'sleeping';
  emergencyStatus: boolean;
}

const PatientStatus: React.FC<PatientStatusProps> = ({
  name,
  location,
  lastUpdate,
  vitalsStatus,
  alertnessStatus,
  emergencyStatus
}) => {
  const getVitalsChip = () => {
    switch (vitalsStatus) {
      case 'normal':
        return (
          <Chip
            icon={<CheckIcon />}
            label="Sinais vitais normais"
            color="success"
            variant="outlined"
          />
        );
      case 'warning':
        return (
          <Chip
            icon={<WarningIcon />}
            label="Atenção aos sinais vitais"
            color="warning"
            variant="outlined"
          />
        );
      case 'critical':
        return (
          <Chip
            icon={<ErrorIcon />}
            label="Sinais vitais críticos"
            color="error"
            variant="outlined"
          />
        );
      default:
        return (
          <Chip
            icon={<CheckIcon />}
            label="Status desconhecido"
            color="default"
            variant="outlined"
          />
        );
    }
  };

  const getAlertnessChip = () => {
    switch (alertnessStatus) {
      case 'awake':
        return (
          <Chip
            label="Acordado"
            color="primary"
            variant="outlined"
          />
        );
      case 'resting':
        return (
          <Chip
            label="Descansando"
            color="info"
            variant="outlined"
          />
        );
      case 'sleeping':
        return (
          <Chip
            label="Dormindo"
            color="default"
            variant="outlined"
          />
        );
      default:
        return (
          <Chip
            label="Status desconhecido"
            color="default"
            variant="outlined"
          />
        );
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 3 },
        background: 'linear-gradient(135deg, #2980B9 0%, #3498DB 100%)',
        color: 'white',
        borderRadius: 2
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        mb: 2
      }}>
        <Box>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              mb: { xs: 1, sm: 0 },
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            {name}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              opacity: 0.9,
              mb: { xs: 1, sm: 0 }
            }}
          >
            <strong>Local:</strong> {location}
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            opacity: 0.8,
            mt: { xs: 1, sm: 0 }
          }}
        >
          <strong>Última atualização:</strong> {lastUpdate}
        </Typography>
      </Box>

      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={{ xs: 1, sm: 2 }}
        sx={{
          '& .MuiChip-root': {
            height: 32,
            '& .MuiChip-label': {
              px: 2
            }
          }
        }}
      >
        {getVitalsChip()}
        {getAlertnessChip()}
        {emergencyStatus && (
          <Chip
            icon={<ErrorIcon />}
            label="Emergência"
            color="error"
            variant="filled"
            sx={{ animation: 'pulse 1.5s infinite' }}
          />
        )}
      </Stack>
    </Paper>
  );
};

export default PatientStatus;
