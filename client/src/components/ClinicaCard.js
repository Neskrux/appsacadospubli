import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Avatar,
  Stack,
  Chip
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatModal from './ChatModal';

export default function ClinicaCard({ clinica }) {
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      <Card sx={{
        background: 'rgba(17, 25, 40, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 2,
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 40px 0 rgba(0,0,0,0.5)'
        }
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 60, 
                height: 60,
                background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%)'
              }}
            >
              {clinica.nome.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ color: 'white' }}>
                {clinica.nome}
              </Typography>
              <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                {clinica.especialidade}
              </Typography>
            </Box>
          </Box>

          <Stack spacing={1} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                {clinica.endereco}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                {clinica.telefone}
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {clinica.setores.map((setor, index) => (
              <Chip
                key={index}
                label={setor}
                size="small"
                sx={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: 'rgb(59, 130, 246)',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}
              />
            ))}
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={() => setOpenChat(true)}
            sx={{
              background: 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(29, 78, 216) 100%)',
              }
            }}
          >
            Enviar Mensagem
          </Button>
        </CardContent>
      </Card>

      <ChatModal 
        open={openChat} 
        onClose={() => setOpenChat(false)} 
        clinica={clinica} 
      />
    </>
  );
} 