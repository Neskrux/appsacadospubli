import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Avatar,
  IconButton,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { API_URLS } from '../config';

export default function ChatModal({ open, onClose, clinica, chatId }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(false);

  // Buscar mensagens reais ao abrir o chat
  React.useEffect(() => {
    if (open && chatId) {
      setLoading(true);
      axios.get(`${API_URLS.chats}/${chatId}/messages`)
        .then(res => setMensagens(res.data))
        .catch(() => setMensagens([]))
        .finally(() => setLoading(false));
    } else {
      setMensagens([]);
    }
  }, [open, chatId]);

  // Mensagem padrão ao abrir
  React.useEffect(() => {
    if (open && clinica) {
      const mensagemPadrao = `Olá, meu nome é ${user?.nome || 'Paciente'}. Gostaria de agendar uma consulta para ${clinica?.setor || clinica?.especialidade || ''}${clinica?.tratamento ? ' - ' + clinica.tratamento : ''}. Por favor, me informe os horários disponíveis.`;
      setMensagem(mensagemPadrao);
      setEnviado(false);
    }
  }, [open, clinica]);

  // Enviar mensagem real
  const handleEnviarMensagem = async () => {
    if (!mensagem.trim()) return;
    try {
      await axios.post(`${API_URLS.chats}/${chatId}/messages`, {
        text: mensagem
      });
      setMensagem('');
      setEnviado(true);
      // Buscar mensagens novamente após envio
      const res = await axios.get(`${API_URLS.chats}/${chatId}/messages`);
      setMensagens(res.data);
    } catch (err) {
      alert('Erro ao enviar mensagem!');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => { setEnviado(false); onClose(); }}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(17, 25, 40, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 2,
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        pb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40,
              background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%)'
            }}
          >
            {clinica?.nome?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ color: 'white' }}>
              {clinica?.nome}
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8' }}>
              {clinica?.setor || clinica?.especialidade}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={() => { setEnviado(false); onClose(); }} sx={{ color: 'rgba(255,255,255,0.5)' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {loading ? (
          <Typography sx={{ color: '#94A3B8', textAlign: 'center', py: 4 }}>Carregando mensagens...</Typography>
        ) : (
          <Stack spacing={2}>
            <Box sx={{ maxHeight: 260, overflowY: 'auto', mb: 2, pr: 1 }}>
              {mensagens.length === 0 ? (
                <Typography sx={{ color: '#94A3B8', textAlign: 'center', py: 2 }}>
                  Nenhuma mensagem ainda.
                </Typography>
              ) : (
                mensagens.map((msg, idx) => (
                  <Box key={msg._id || idx} sx={{
                    display: 'flex',
                    flexDirection: msg.sender === user?.id ? 'row-reverse' : 'row',
                    alignItems: 'flex-end',
                    mb: 1
                  }}>
                    <Avatar sx={{ width: 28, height: 28, ml: msg.sender === user?.id ? 2 : 0, mr: msg.sender === user?.id ? 0 : 2, bgcolor: msg.sender === user?.id ? '#3B82F6' : '#64748b' }}>
                      {msg.sender === user?.id ? (user?.nome?.charAt(0) || 'U') : (clinica?.nome?.charAt(0) || 'C')}
                    </Avatar>
                    <Box sx={{
                      bgcolor: msg.sender === user?.id ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.08)',
                      color: '#fff',
                      px: 2, py: 1, borderRadius: 2, maxWidth: 320,
                      fontSize: 15, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)'
                    }}>
                      {msg.text}
                      <Typography sx={{ fontSize: 11, color: '#94A3B8', mt: 0.5, textAlign: 'right' }}>
                        {new Date(msg.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Box>
                  </Box>
                ))
              )}
            </Box>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                  }
                }
              }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleEnviarMensagem}
              sx={{
                background: 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(29, 78, 216) 100%)',
                }
              }}
            >
              Enviar
            </Button>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
} 