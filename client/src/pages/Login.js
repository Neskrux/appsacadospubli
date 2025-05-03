import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, TextField, Snackbar, Alert, Stack, InputAdornment, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const history = useHistory();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://192.168.0.27:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setSnackbar({ open: true, message: 'Login realizado com sucesso!', severity: 'success' });
      setTimeout(() => history.push('/app'), 1000);
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.error || 'Erro ao fazer login.', severity: 'error' });
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
          background: 'radial-gradient(at 0% 0%, rgb(29, 78, 216) 0px, transparent 50%), radial-gradient(at 100% 0%, rgb(13, 148, 136) 0px, transparent 50%), radial-gradient(at 100% 100%, rgb(30, 64, 175) 0px, transparent 50%), radial-gradient(at 0% 100%, rgb(17, 94, 89) 0px, transparent 50%)',
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

      <Card 
        sx={{ 
          maxWidth: 400,
          width: '100%',
          background: 'rgba(17, 25, 40, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 4,
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)',
          position: 'relative',
          zIndex: 2,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '200%',
            height: '4px',
            background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), transparent)',
            animation: 'shimmer 4s infinite linear'
          }
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              {/* Espaço para a Logo */}
              <Box 
                sx={{ 
                  width: '120px',
                  height: '120px',
                  margin: '0 auto 24px',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
                  backdropFilter: 'blur(8px)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: '-1px',
                    borderRadius: '24px',
                    padding: '1px',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }
                }}
              >
                {/* Aqui você pode adicionar sua logo como imagem */}
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: '#3B82F6',
                    fontWeight: 800,
                    fontSize: '2rem'
                  }}
                >
                  AS
                </Typography>
              </Box>

              <Typography 
                variant="h4" 
                fontWeight={800} 
                sx={{ 
                  mb: 1,
                  background: 'linear-gradient(135deg, #fff 0%, #94A3B8 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Bem-vindo de volta!
              </Typography>
              <Typography 
                color="#94A3B8"
                sx={{ fontSize: 16 }}
              >
                Entre com suas credenciais para continuar
              </Typography>
            </Box>

            <Stack spacing={3} component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'rgba(255,255,255,0.3)' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    color: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.1)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { 
                    color: '#94A3B8',
                    '&.Mui-focused': {
                      color: 'rgba(59, 130, 246, 0.8)'
                    }
                  }
                }}
              />

              <TextField
                fullWidth
                label="Senha"
                name="senha"
                type={showPassword ? 'text' : 'password'}
                value={form.senha}
                onChange={handleChange}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'rgba(255,255,255,0.3)' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: 'rgba(255,255,255,0.3)' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    color: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.1)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(59, 130, 246, 0.5)',
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { 
                    color: '#94A3B8',
                    '&.Mui-focused': {
                      color: 'rgba(59, 130, 246, 0.8)'
                    }
                  }
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.8,
                  mt: 2,
                  background: 'linear-gradient(135deg, rgb(29, 78, 216) 0%, rgb(30, 64, 175) 100%)',
                  fontSize: 16,
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(29, 78, 216) 100%)',
                  }
                }}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>

              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                <Typography sx={{ color: '#94A3B8', fontSize: 15 }}>
                  Não tem uma conta?
                </Typography>
                <Typography
                  component="a"
                  onClick={() => history.push('/')}
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
                  Cadastre-se
                </Typography>
              </Stack>
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