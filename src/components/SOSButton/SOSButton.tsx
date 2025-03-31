import React, { useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Typography,
  Paper,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

const SOSButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSOSClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    setShowSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Botão de Emergência
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100% - 80px)'
        }}
      >
        <Box
          onClick={handleSOSClick}
          sx={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            bgcolor: '#E74C3C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              bgcolor: '#C0392B'
            },
            '&:active': {
              transform: 'scale(0.95)'
            }
          }}
        >
          <Typography
            variant="h4"
            component="span"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              userSelect: 'none'
            }}
          >
            SOS
          </Typography>
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="error" />
          <Typography variant="h6">Confirmação de Emergência</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description">
            Você está prestes a acionar o serviço de emergência. Deseja continuar?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="error" variant="contained" autoFocus>
            Confirmar Emergência
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" variant="filled">
          Serviço de emergência foi notificado! Uma equipe está a caminho.
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default SOSButton;
