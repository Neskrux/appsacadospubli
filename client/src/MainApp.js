import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Tooltip from '@mui/material/Tooltip';
import { useHistory } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { keyframes } from '@mui/system';

// Gradiente animado para o fundo
const animatedGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Efeito pulse para o limite
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.3); }
  70% { box-shadow: 0 0 0 12px rgba(59,130,246,0); }
  100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.3); }
`;

// Novo gradiente mais clean
const fintechGradient = 'linear-gradient(120deg, #1e3a8a 0%, #2563eb 100%)';

export default function MainApp() {
  const history = useHistory();
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState('');
  const [userLimite, setUserLimite] = useState(2000);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserType(user.tipo);
      setUserName(user.nome);
      setUserLimite(user.limite || 2000);
    }
  }, []);

  return (
    <AppLayout>
      {/* Fundo mais clean */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          background: fintechGradient,
          backgroundSize: '100% 100%',
          filter: 'none',
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 6 }, py: { xs: 4, md: 8 } }}>
        <Typography 
          variant="h3" 
          fontWeight={800} 
          color="#fff" 
          align="center" 
          mb={1}
          sx={{
            letterSpacing: 1,
            fontSize: { xs: 28, md: 38 },
            mb: 2
          }}
        >
          👋 Bem-vindo, {userName}!
        </Typography>
        {/* Limite em formato cartão */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(90deg, #0ea5e9 0%, #2563eb 100%)',
            color: '#fff',
            borderRadius: 4,
            px: { xs: 3, md: 6 },
            py: { xs: 2, md: 3 },
            minWidth: 320,
            maxWidth: 400,
            boxShadow: '0 8px 32px 0 rgba(59,130,246,0.18)',
            border: 'none',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <AttachMoneyIcon sx={{ fontSize: 38, color: '#fff', opacity: 0.7, mr: 2 }} />
            <Box>
              <Typography sx={{ fontSize: 15, fontWeight: 500, opacity: 0.85 }}>
                Limite disponível
              </Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 30, letterSpacing: 1, mt: 0.5 }}>
                R$ {userLimite.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography 
          color="#e0e7ef" 
          align="center" 
          mb={6} 
          sx={{ fontSize: { xs: 16, md: 18 }, maxWidth: 600, mx: 'auto', fontWeight: 400 }}
        >
          {userType === 'clinica' 
            ? 'Gerencie sua clínica, atendimentos e converse com pacientes de forma eficiente.'
            : 'Encontre as melhores clínicas, agende consultas e converse com especialistas de forma simples e rápida.'}
        </Typography>
        {/* Cards centralizados e espaçados */}
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} sm={6} md={4} sx={{ height: '100%' }}>
            <Card sx={{
              borderRadius: 4,
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              boxShadow: '0 4px 24px 0 rgba(30,58,138,0.10)',
              border: 'none',
              minHeight: 260,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-6px) scale(1.03)',
                boxShadow: '0 12px 32px 0 rgba(30,58,138,0.18)',
              }
            }}>
              <CardContent sx={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', height: '100%', flex: '1 1 auto', justifyContent: 'space-between' }}>
                <SearchIcon sx={{ fontSize: 48, color: '#38bdf8', mb: 2 }} />
                <Typography variant="h6" fontWeight={700} color="#fff" mb={1}>
                  Buscar Clínicas
                </Typography>
                <Typography color="#cbd5e1" sx={{ fontSize: 15, flexGrow: 1 }}>
                  Encontre as melhores clínicas e especialistas próximos a você.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large" 
                  fullWidth
                  onClick={() => history.push('/buscar-clinicas')}
                  sx={{ 
                    fontWeight: 700,
                    fontSize: 16,
                    background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
                    borderRadius: 2,
                    boxShadow: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)'
                    }
                  }}
                >
                  Buscar Agora
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ height: '100%' }}>
            <Card sx={{
              borderRadius: 4,
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              boxShadow: '0 4px 24px 0 rgba(30,58,138,0.10)',
              border: 'none',
              minHeight: 260,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-6px) scale(1.03)',
                boxShadow: '0 12px 32px 0 rgba(30,58,138,0.18)',
              }
            }}>
              <CardContent sx={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', height: '100%', flex: '1 1 auto', justifyContent: 'space-between' }}>
                <CalendarMonthIcon sx={{ fontSize: 48, color: '#38bdf8', mb: 2 }} />
                <Typography variant="h6" fontWeight={700} color="#fff" mb={1}>
                  Meus Agendamentos
                </Typography>
                <Typography color="#cbd5e1" sx={{ fontSize: 15, flexGrow: 1 }}>
                  Visualize e gerencie todas as suas consultas agendadas em um só lugar.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large" 
                  fullWidth
                  onClick={() => history.push('/meus-agendamentos')}
                  sx={{ 
                    fontWeight: 700,
                    fontSize: 16,
                    background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
                    borderRadius: 2,
                    boxShadow: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)'
                    }
                  }}
                >
                  Ver Agenda
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ height: '100%' }}>
            <Card sx={{
              borderRadius: 4,
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              boxShadow: '0 4px 24px 0 rgba(30,58,138,0.10)',
              border: 'none',
              minHeight: 260,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-6px) scale(1.03)',
                boxShadow: '0 12px 32px 0 rgba(30,58,138,0.18)',
              }
            }}>
              <CardContent sx={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', height: '100%', flex: '1 1 auto', justifyContent: 'space-between' }}>
                <PersonIcon sx={{ fontSize: 48, color: '#38bdf8', mb: 2 }} />
                <Typography variant="h6" fontWeight={700} color="#fff" mb={1}>
                  Meu Perfil
                </Typography>
                <Typography color="#cbd5e1" sx={{ fontSize: 15, flexGrow: 1 }}>
                  Gerencie seus dados pessoais, histórico médico e preferências.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large" 
                  fullWidth
                  onClick={() => history.push('/perfil')}
                  sx={{ 
                    fontWeight: 700,
                    fontSize: 16,
                    background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
                    borderRadius: 2,
                    boxShadow: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)'
                    }
                  }}
                >
                  Editar Perfil
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  );
} 