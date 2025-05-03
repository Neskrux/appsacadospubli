import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { useHistory } from 'react-router-dom';
import AppLayout from './components/AppLayout';

export default function MainApp() {
  const history = useHistory();
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserType(user.tipo);
      setUserName(user.nome);
    }
  }, []);

  return (
    <AppLayout>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 6 }, py: { xs: 4, md: 8 } }}>
        <Typography 
          variant="h3" 
          fontWeight={800} 
          color="#fff" 
          align="center" 
          mb={1}
          sx={{
            background: 'linear-gradient(135deg, #fff 0%, #b0b8c1 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Bem-vindo, {userName}!
        </Typography>
        <Typography 
          color="#b0b8c1" 
          align="center" 
          mb={6} 
          sx={{ 
            fontSize: { xs: 18, md: 20 },
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          {userType === 'clinica' 
            ? 'Gerencie sua clínica, atendimentos e converse com pacientes de forma eficiente.'
            : 'Encontre as melhores clínicas, agende consultas e converse com especialistas de forma simples e rápida.'}
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
          {userType === 'clinica' ? (
            // Cards para Clínicas
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ 
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(13, 25, 41, 0.95) 0%, rgba(8, 19, 32, 0.95) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                    '& .icon': {
                      transform: 'scale(1.1) translateY(-4px)',
                      color: '#2196f3'
                    }
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flex: 1 }}>
                      <LocalHospitalIcon className="icon" sx={{ 
                        fontSize: 56, 
                        color: '#64b5f6',
                        mb: 3,
                        transition: 'all 0.3s ease-in-out'
                      }} />
                      <Typography variant="h5" fontWeight={700} color="#fff" mb={2}>
                        Minha Clínica
                      </Typography>
                      <Typography color="#b0b8c1" mb={4} sx={{ fontSize: 16 }}>
                        Gerencie informações, horários e serviços da sua clínica de forma eficiente.
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained" 
                      size="large" 
                      fullWidth
                      sx={{ 
                        py: 1.5,
                        background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)'
                        }
                      }}
                    >
                      Gerenciar Clínica
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ 
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(13, 25, 41, 0.95) 0%, rgba(8, 19, 32, 0.95) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                    '& .icon': {
                      transform: 'scale(1.1) translateY(-4px)',
                      color: '#2196f3'
                    }
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flex: 1 }}>
                      <CalendarMonthIcon className="icon" sx={{ 
                        fontSize: 56, 
                        color: '#64b5f6',
                        mb: 3,
                        transition: 'all 0.3s ease-in-out'
                      }} />
                      <Typography variant="h5" fontWeight={700} color="#fff" mb={2}>
                        Agendamentos
                      </Typography>
                      <Typography color="#b0b8c1" mb={4} sx={{ fontSize: 16 }}>
                        Visualize e gerencie todos os agendamentos da sua clínica em um só lugar.
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained" 
                      size="large" 
                      fullWidth
                      sx={{ 
                        py: 1.5,
                        background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)'
                        }
                      }}
                    >
                      Ver Agenda
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ 
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(13, 25, 41, 0.95) 0%, rgba(8, 19, 32, 0.95) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                    '& .icon': {
                      transform: 'scale(1.1) translateY(-4px)',
                      color: '#2196f3'
                    }
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flex: 1 }}>
                      <ChatIcon className="icon" sx={{ 
                        fontSize: 56, 
                        color: '#64b5f6',
                        mb: 3,
                        transition: 'all 0.3s ease-in-out'
                      }} />
                      <Typography variant="h5" fontWeight={700} color="#fff" mb={2}>
                        Chat
                      </Typography>
                      <Typography color="#b0b8c1" mb={4} sx={{ fontSize: 16 }}>
                        Converse com seus pacientes e gerencie atendimentos em tempo real.
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained" 
                      size="large" 
                      fullWidth
                      sx={{ 
                        py: 1.5,
                        background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)'
                        }
                      }}
                    >
                      Acessar Chat
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </>
          ) : (
            // Cards para Pacientes
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ 
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(13, 25, 41, 0.95) 0%, rgba(8, 19, 32, 0.95) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                    '& .icon': {
                      transform: 'scale(1.1) translateY(-4px)',
                      color: '#2196f3'
                    }
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flex: 1 }}>
                      <SearchIcon className="icon" sx={{ 
                        fontSize: 56, 
                        color: '#64b5f6',
                        mb: 3,
                        transition: 'all 0.3s ease-in-out'
                      }} />
                      <Typography variant="h5" fontWeight={700} color="#fff" mb={2}>
                        Buscar Clínicas
                      </Typography>
                      <Typography color="#b0b8c1" mb={4} sx={{ fontSize: 16 }}>
                        Encontre as melhores clínicas e especialistas próximos a você.
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained" 
                      size="large" 
                      fullWidth
                      onClick={() => history.push('/buscar-clinicas')}
                      sx={{ 
                        py: 1.5,
                        background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)'
                        }
                      }}
                    >
                      Buscar Agora
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ 
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(13, 25, 41, 0.95) 0%, rgba(8, 19, 32, 0.95) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                    '& .icon': {
                      transform: 'scale(1.1) translateY(-4px)',
                      color: '#2196f3'
                    }
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flex: 1 }}>
                      <CalendarMonthIcon className="icon" sx={{ 
                        fontSize: 56, 
                        color: '#64b5f6',
                        mb: 3,
                        transition: 'all 0.3s ease-in-out'
                      }} />
                      <Typography variant="h5" fontWeight={700} color="#fff" mb={2}>
                        Meus Agendamentos
                      </Typography>
                      <Typography color="#b0b8c1" mb={4} sx={{ fontSize: 16 }}>
                        Visualize e gerencie todas as suas consultas agendadas em um só lugar.
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained" 
                      size="large" 
                      fullWidth
                      onClick={() => history.push('/meus-agendamentos')}
                      sx={{ 
                        py: 1.5,
                        background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)'
                        }
                      }}
                    >
                      Ver Agenda
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ 
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(13, 25, 41, 0.95) 0%, rgba(8, 19, 32, 0.95) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                    '& .icon': {
                      transform: 'scale(1.1) translateY(-4px)',
                      color: '#2196f3'
                    }
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flex: 1 }}>
                      <PersonIcon className="icon" sx={{ 
                        fontSize: 56, 
                        color: '#64b5f6',
                        mb: 3,
                        transition: 'all 0.3s ease-in-out'
                      }} />
                      <Typography variant="h5" fontWeight={700} color="#fff" mb={2}>
                        Meu Perfil
                      </Typography>
                      <Typography color="#b0b8c1" mb={4} sx={{ fontSize: 16 }}>
                        Gerencie seus dados pessoais, histórico médico e preferências.
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained" 
                      size="large" 
                      fullWidth
                      sx={{ 
                        py: 1.5,
                        background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)'
                        }
                      }}
                    >
                      Editar Perfil
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </AppLayout>
  );
} 