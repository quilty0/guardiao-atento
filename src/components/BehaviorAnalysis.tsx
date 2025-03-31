import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Alert,
  Box,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface BehaviorPattern {
  type: string;
  value: number;
  normalRange: [number, number];
  unit: string;
}

interface Anomaly {
  type: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  detectedAt: Date;
}

interface BehaviorAnalysisProps {
  patterns: BehaviorPattern[];
  anomalies: Anomaly[];
}

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
}));

const PatternCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(2),
}));

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'info';
    default:
      return 'info';
  }
};

const BehaviorAnalysis: React.FC<BehaviorAnalysisProps> = ({ patterns, anomalies }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Análise de Comportamento
      </Typography>

      <Grid container spacing={3}>
        {patterns.map((pattern, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PatternCard>
              <Typography variant="h6" gutterBottom>
                {pattern.type}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Valor atual: {pattern.value} {pattern.unit}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Faixa normal: {pattern.normalRange[0]} - {pattern.normalRange[1]} {pattern.unit}
              </Typography>
              <Box mt={2}>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((pattern.value / pattern.normalRange[1]) * 100, 100)}
                  color={pattern.value >= pattern.normalRange[0] && pattern.value <= pattern.normalRange[1] ? 'primary' : 'error'}
                />
              </Box>
            </PatternCard>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Anomalias Detectadas
      </Typography>

      {anomalies.map((anomaly, index) => (
        <Alert
          key={index}
          severity={getSeverityColor(anomaly.severity)}
          sx={{ mb: 2 }}
        >
          <Typography variant="subtitle1">
            {anomaly.type}
          </Typography>
          <Typography variant="body2">
            {anomaly.message}
          </Typography>
          <Typography variant="caption" display="block">
            Detectado em: {new Date(anomaly.detectedAt).toLocaleString()}
          </Typography>
        </Alert>
      ))}
    </Box>
  );
};

export default BehaviorAnalysis; 