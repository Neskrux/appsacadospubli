import React from 'react';
import { Box, Button, Typography, Card, CardContent, Stack } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import { useHistory } from 'react-router-dom';

export default function AuthHome() {
  const history = useHistory();

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A1929',
        position: 'relative',
        overflow: 'hidden',
        p: { xs: 2, sm: 4 }
      }}
    >
      {/* Mesh Gradient Background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, #1E3A8A 0%, #0A1929 100%)',
          opacity: 0.8,
          zIndex: 0
        }}
      />

      {/* Animated Particles */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite',
          zIndex: 1
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 4 }}>
          {/* Texto base branco */}
          <Box
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              color: '#fff',
              textAlign: 'center',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              userSelect: 'none',
              position: 'relative',
              zIndex: 1
            }}
          >
            Encontre seu tratamento no Boleto.
          </Box>
          {/* Texto com brilho animado */}
          <Box
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              color: 'transparent',
              textAlign: 'center',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              userSelect: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              zIndex: 2,
              background: 'linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
              backgroundSize: '200% auto',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'luxo-shine-move 1.2s cubic-bezier(0.4,0.0,0.2,1) infinite',
              pointerEvents: 'none'
            }}
          >
            Encontre seu tratamento no Boleto.
          </Box>
        </Box>

        <Typography
          variant="h5"
          sx={{
            color: '#94A3B8',
            mb: 6,
            fontSize: { xs: '1rem', sm: '1.25rem' },
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Selecione o tipo de usuário para continuar
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          sx={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Card
            sx={{
              width: { xs: '100%', sm: '300px' },
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                background: 'rgba(255, 255, 255, 0.08)'
              }
            }}
            onClick={() => history.push('/cadastro-clinica')}
          >
            <CardContent>
              <LocalHospitalIcon
                sx={{
                  fontSize: 48,
                  color: '#3B82F6',
                  mb: 2
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  mb: 1
                }}
              >
                Clínica
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#94A3B8'
                }}
              >
                Acesse como clínica para gerenciar seus pacientes e agendamentos
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              width: { xs: '100%', sm: '300px' },
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                background: 'rgba(255, 255, 255, 0.08)'
              }
            }}
            onClick={() => history.push('/cadastro-paciente')}
          >
            <CardContent>
              <PersonIcon
                sx={{
                  fontSize: 48,
                  color: '#3B82F6',
                  mb: 2
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  mb: 1
                }}
              >
                Paciente
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#94A3B8'
                }}
              >
                Acesse como paciente para agendar consultas e gerenciar seu histórico
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
} 