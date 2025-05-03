import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Snackbar, 
  Alert, 
  Stack,
  InputAdornment
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function CadastroPaciente() {
  const history = useHistory();
  const [form, setForm] = useState({ 
    nome: '', 
    email: '', 
    senha: '', 
    telefone: '', 
    cpf: '', 
    cep: '' 
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/cadastro-paciente', form);
      setSnackbar({ open: true, message: res.data.message, severity: 'success' });
      setTimeout(() => history.push('/login'), 1500);
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.error || 'Erro ao cadastrar.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

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
          opacity: 0.6,
          background: 'radial-gradient(at 80% 0%, rgb(59, 130, 246) 0px, transparent 50%), radial-gradient(at 0% 50%, rgb(55, 48, 163) 0px, transparent 50%), radial-gradient(at 80% 50%, rgb(17, 24, 39) 0px, transparent 50%), radial-gradient(at 0% 100%, rgb(59, 130, 246) 0px, transparent 50%), radial-gradient(at 80% 100%, rgb(55, 48, 163) 0px, transparent 50%), radial-gradient(at 0% 0%, rgb(17, 24, 39) 0px, transparent 50%)',
          zIndex: 0,
          animation: 'gradient 15s ease infinite',
          backgroundSize: '400% 400%',
          transform: 'scale(1.5)',
          filter: 'blur(2px)'
        }}
      />

      {/* Partículas animadas */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          opacity: 0.5,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 4s ease-in-out infinite'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'1.5\' fill=\'%23ffffff\' fill-opacity=\'0.2\'/%3E%3C/svg%3E")',
            backgroundSize: '100px 100px',
            animation: 'float 8s ease-in-out infinite'
          }
        }}
      />

      {/* Efeito de luz superior */}
      <Box
        sx={{
          position: 'fixed',
          top: '-50%',
          left: '-10%',
          width: '120%',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          transform: 'rotate(-12deg)',
          zIndex: 1,
          animation: 'pulse 8s ease-in-out infinite'
        }}
      />

      <Card 
        sx={{ 
          maxWidth: 480,
          width: '100%',
          background: 'rgba(17, 25, 40, 0.75)',
          backdropFilter: 'blur(20px)',
          borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-50%',
            width: '200%',
            height: '4px',
            background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), transparent)',
            animation: 'shimmer 4s infinite linear'
          }
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Stack spacing={4} component="form" onSubmit={handleSubmit}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h4" 
                component="h1" 
                fontWeight={800} 
                sx={{ 
                  mb: 2,
                  background: 'linear-gradient(135deg, #fff 0%, #94A3B8 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px'
                }}
              >
                Cadastro de Paciente
              </Typography>
              <Typography 
                color="#94A3B8" 
                sx={{ 
                  fontSize: { xs: 16, sm: 18 },
                  maxWidth: 320,
                  mx: 'auto',
                  opacity: 0.9
                }}
              >
                Preencha seus dados para criar sua conta
              </Typography>
            </Box>

            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Nome Completo"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: 'rgba(255,255,255,0.3)' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { color: '#94A3B8' }
                }}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'rgba(255,255,255,0.3)' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { color: '#94A3B8' }
                }}
              />

              <TextField
                fullWidth
                label="Senha"
                name="senha"
                type="password"
                value={form.senha}
                onChange={handleChange}
                required
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'rgba(255,255,255,0.3)' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { color: '#94A3B8' }
                }}
              />

              <TextField
                fullWidth
                label="Telefone"
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                required
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: 'rgba(255,255,255,0.3)' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { color: '#94A3B8' }
                }}
              />

              <TextField
                fullWidth
                label="CPF"
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                required
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon sx={{ color: 'rgba(255,255,255,0.3)' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { color: '#94A3B8' }
                }}
              />

              <TextField
                fullWidth
                label="CEP"
                name="cep"
                value={form.cep}
                onChange={handleChange}
                required
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon sx={{ color: 'rgba(255,255,255,0.3)' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'rgba(255,255,255,0.08)',
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { color: '#94A3B8' }
                }}
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 2,
                background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%)',
                fontSize: 16,
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, rgb(96, 165, 250) 0%, rgb(59, 130, 246) 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>

            <Stack direction="row" spacing={1} justifyContent="center">
              <Typography 
                component="span"
                sx={{ 
                  color: '#94A3B8',
                  fontSize: 15
                }}
              >
                Já tem uma conta?
              </Typography>
              <Typography
                component="a"
                onClick={() => history.push('/login')}
                sx={{ 
                  color: 'rgb(147, 197, 253)',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'rgb(59, 130, 246)',
                    textDecoration: 'underline'
                  }
                }}
              >
                Faça login
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={2500} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            borderRadius: 3,
            bgcolor: snackbar.severity === 'success' ? 'rgb(21, 128, 61)' : 'rgb(180, 35, 24)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 