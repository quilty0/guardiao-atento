import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './styles/theme';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import LocationMap from './components/LocationMap/LocationMap';
import SOSButton from './components/SOSButton/SOSButton';
import HealthCards from './components/HealthCards/HealthCards';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Navbar />
        <Box sx={{ flex: 1, p: 2 }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            <Header />
            <HealthCards />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 2 }}>
                <LocationMap 
                  location="Teresina, PI"
                  lastUpdate="há 5 minutos"
                  status="Dentro da área segura"
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <SOSButton />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
