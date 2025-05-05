import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import { deepPurple } from '@mui/material/colors';
import AppLayout from '../components/AppLayout';

export default function Perfil() {
  const [user, setUser] = useState({ nome: '', email: '', telefone: '', dataNascimento: '' });
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Aqui você pode integrar com o backend para salvar as alterações
    localStorage.setItem('user', JSON.stringify(user));
    setEditMode(false);
    setSnackbar({ open: true, message: 'Dados atualizados com sucesso!', severity: 'success' });
  };

  return (
    <AppLayout>
      <Box sx={{ maxWidth: 500, mx: 'auto', py: 6 }}>
        <Card sx={{ p: 4, borderRadius: 4, background: 'rgba(17, 25, 40, 0.95)', boxShadow: '0 8px 32px 0 rgba(59,130,246,0.08)' }}>
          <CardContent>
            <Stack alignItems="center" spacing={2} mb={3}>
              <Avatar sx={{ width: 96, height: 96, bgcolor: deepPurple[500], fontSize: 40 }}>
                {user.nome?.charAt(0) || '?'}
              </Avatar>
              <Typography variant="h5" fontWeight={700} color="#fff">
                {user.nome || 'Nome do Usuário'}
              </Typography>
              <Typography color="#b0b8c1" fontSize={16}>
                {user.email || 'email@exemplo.com'}
              </Typography>
            </Stack>
            <Stack spacing={3}>
              <TextField
                label="Nome"
                name="nome"
                value={user.nome}
                onChange={handleChange}
                fullWidth
                disabled={!editMode}
                variant="outlined"
                InputLabelProps={{ style: { color: '#b0b8c1' } }}
              />
              <TextField
                label="E-mail"
                name="email"
                value={user.email}
                onChange={handleChange}
                fullWidth
                disabled={!editMode}
                variant="outlined"
                InputLabelProps={{ style: { color: '#b0b8c1' } }}
              />
              <TextField
                label="Telefone"
                name="telefone"
                value={user.telefone || ''}
                onChange={handleChange}
                fullWidth
                disabled={!editMode}
                variant="outlined"
                InputLabelProps={{ style: { color: '#b0b8c1' } }}
              />
              <TextField
                label="Data de Nascimento"
                name="dataNascimento"
                value={user.dataNascimento || ''}
                onChange={handleChange}
                fullWidth
                disabled={!editMode}
                variant="outlined"
                InputLabelProps={{ style: { color: '#b0b8c1' } }}
              />
            </Stack>
            <Stack direction="row" spacing={2} mt={4} justifyContent="center">
              {editMode ? (
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{ minWidth: 140 }}
                >
                  Salvar
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setEditMode(true)}
                  sx={{ minWidth: 140, color: '#3B82F6', borderColor: '#3B82F6' }}
                >
                  Editar Perfil
                </Button>
              )}
              <Button
                variant="outlined"
                startIcon={<LockIcon />}
                sx={{ minWidth: 140, color: '#3B82F6', borderColor: '#3B82F6' }}
                // onClick={handleChangePassword}
              >
                Trocar Senha
              </Button>
            </Stack>
          </CardContent>
        </Card>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AppLayout>
  );
} 