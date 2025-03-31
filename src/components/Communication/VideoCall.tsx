import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  Avatar,
  Paper,
  Tooltip,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  Call,
  CallEnd,
  Person,
  WhatsApp,
  Phone,
  LocalPhone
} from '@mui/icons-material';
import MessageService from '../../services/MessageService';

const VideoCall: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCallConnecting, setIsCallConnecting] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const monitoredContact = MessageService.getInstance().getMonitoredContact();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const startLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      setIsVideoEnabled(false);
    }
  };

  const stopLocalVideo = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
  };

  const handleStartCall = async () => {
    setIsCallConnecting(true);
    await startLocalVideo();
    
    // Simulando conexão
    setTimeout(() => {
      setIsCallConnecting(false);
      setIsCallActive(true);
    }, 2000);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    stopLocalVideo();
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
        setIsVideoEnabled(!isVideoEnabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
        setIsAudioEnabled(!isAudioEnabled);
      }
    }
  };

  const handleWhatsAppCall = () => {
    window.open(`https://wa.me/${monitoredContact.phone.replace(/\D/g, '')}`, '_blank');
  };

  const handlePhoneCall = () => {
    window.location.href = `tel:${monitoredContact.phone.replace(/\D/g, '')}`;
  };

  useEffect(() => {
    return () => {
      stopLocalVideo();
    };
  }, []);

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      gap: isMobile ? 1 : 2,
      p: isMobile ? 1 : 2
    }}>
      <Avatar 
        sx={{ 
          width: isMobile ? 60 : 80, 
          height: isMobile ? 60 : 80 
        }}
      >
        <Person sx={{ fontSize: 40 }} />
      </Avatar>
      
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMobile ? 'center' : 'flex-start',
        gap: 0.5
      }}>
        <Typography 
          variant={isMobile ? "body1" : "h6"}
          sx={{ fontWeight: 'bold' }}
        >
          {monitoredContact.name}
        </Typography>
        
        <Chip 
          label={monitoredContact.relationship} 
          color="primary" 
          size={isMobile ? "small" : "medium"}
          sx={{ mb: 1 }}
        />

        <Typography 
          variant={isMobile ? "body2" : "body1"}
          color="text.secondary"
        >
          {monitoredContact.phone}
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex',
        gap: 1,
        ml: isMobile ? 0 : 'auto'
      }}>
        <Tooltip title="Chamada de WhatsApp">
          <IconButton 
            color="primary" 
            onClick={handleWhatsAppCall}
            size={isMobile ? "small" : "medium"}
          >
            <WhatsApp />
          </IconButton>
        </Tooltip>
        <Tooltip title="Ligação telefônica">
          <IconButton 
            color="primary" 
            onClick={handlePhoneCall}
            size={isMobile ? "small" : "medium"}
          >
            <LocalPhone />
          </IconButton>
        </Tooltip>
        <Tooltip title={isCallActive ? "Encerrar videochamada" : "Iniciar videochamada"}>
          <IconButton
            color={isCallActive ? 'error' : 'primary'}
            onClick={isCallActive ? handleEndCall : handleStartCall}
            disabled={isCallConnecting}
            size={isMobile ? "small" : "medium"}
          >
            {isCallActive ? <CallEnd /> : <Call />}
          </IconButton>
        </Tooltip>
      </Box>

      <Dialog
        open={isCallActive || isCallConnecting}
        maxWidth="md"
        fullWidth
      >
        <DialogContent
          sx={{
            height: '70vh',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {isCallConnecting ? (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <Typography variant="h6">
                Conectando chamada com {monitoredContact.name}...
              </Typography>
              <Avatar
                sx={{ width: 96, height: 96 }}
              >
                <Person sx={{ fontSize: 48 }} />
              </Avatar>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  flex: 1,
                  position: 'relative',
                  bgcolor: 'black',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 2,
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    p: 1,
                    borderRadius: 2
                  }}
                >
                  <Tooltip title={isVideoEnabled ? 'Desativar vídeo' : 'Ativar vídeo'}>
                    <IconButton onClick={toggleVideo} color="primary">
                      {isVideoEnabled ? <Videocam /> : <VideocamOff />}
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title={isAudioEnabled ? 'Desativar microfone' : 'Ativar microfone'}>
                    <IconButton onClick={toggleAudio} color="primary">
                      {isAudioEnabled ? <Mic /> : <MicOff />}
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Encerrar chamada">
                    <IconButton onClick={handleEndCall} color="error">
                      <CallEnd />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    width: 160,
                    height: 90,
                    bgcolor: 'black',
                    borderRadius: 1,
                    overflow: 'hidden'
                  }}
                >
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VideoCall; 