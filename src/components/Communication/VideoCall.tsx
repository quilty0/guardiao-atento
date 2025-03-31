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
  Chip
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
  Phone
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
    // Em um ambiente real, aqui abriria o WhatsApp com o número do contato
    window.open(`https://wa.me/${monitoredContact.phone.replace(/\D/g, '')}`, '_blank');
  };

  const handlePhoneCall = () => {
    // Em um ambiente real, aqui iniciaria uma chamada telefônica
    window.location.href = `tel:${monitoredContact.phone.replace(/\D/g, '')}`;
  };

  useEffect(() => {
    return () => {
      stopLocalVideo();
    };
  }, []);

  return (
    <Box>
      <Paper 
        elevation={3}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{ width: 64, height: 64 }}
            >
              <Person sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h6">{monitoredContact.name}</Typography>
              <Chip 
                label={monitoredContact.relationship}
                size="small"
                color="primary"
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Chamada de WhatsApp">
              <IconButton 
                color="success" 
                onClick={handleWhatsAppCall}
              >
                <WhatsApp />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ligação telefônica">
              <IconButton 
                color="primary"
                onClick={handlePhoneCall}
              >
                <Phone />
              </IconButton>
            </Tooltip>
            <Tooltip title={isCallActive ? "Encerrar videochamada" : "Iniciar videochamada"}>
              <IconButton
                color={isCallActive ? 'error' : 'primary'}
                onClick={isCallActive ? handleEndCall : handleStartCall}
                disabled={isCallConnecting}
              >
                {isCallActive ? <CallEnd /> : <Call />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {monitoredContact.phone}
        </Typography>
      </Paper>

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