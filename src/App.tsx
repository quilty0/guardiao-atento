import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box, Tab, Tabs } from '@mui/material';
import { theme } from './styles/theme';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import LocationMap from './components/LocationMap/LocationMap';
import SOSButton from './components/SOSButton/SOSButton';
import HealthCards from './components/HealthCards/HealthCards';
import BehaviorAnalysis from './components/BehaviorAnalysis';
import CommunicationPanel from './components/Communication/CommunicationPanel';
import { getCurrentPatterns, detectAnomalies, predictRisks } from './services/behaviorAnalysis';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const App: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [patterns, setPatterns] = useState(getCurrentPatterns());
  const [anomalies, setAnomalies] = useState([...detectAnomalies(patterns), ...predictRisks(patterns)]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Simular atualizações de dados a cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      const newPatterns = getCurrentPatterns();
      setPatterns(newPatterns);
      setAnomalies([...detectAnomalies(newPatterns), ...predictRisks(newPatterns)]);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Navbar 
          onNavigate={setTabValue}
          currentTab={tabValue}
        />
        <Box sx={{ flex: 1, p: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Principal" />
            <Tab label="Análise de Comportamento" />
            <Tab label="Comunicação" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
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
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <BehaviorAnalysis 
              patterns={patterns}
              anomalies={anomalies}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <CommunicationPanel />
          </TabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
