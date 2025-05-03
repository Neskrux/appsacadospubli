import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Badge,
  Menu,
  MenuItem,
  Stack,
  TextField
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  CalendarToday,
  People,
  Settings,
  Notifications,
  ExitToApp,
  Add,
  Search,
  FilterList,
  MoreVert
} from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

const drawerWidth = 280;

export default function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/login');
  };

  const drawer = (
    <Box sx={{ 
      height: '100%',
      background: 'rgba(17, 25, 40, 0.75)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #fff 0%, #94A3B8 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          MedicalApp
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <List sx={{ flex: 1, p: 2 }}>
        {[
          { text: 'Dashboard', icon: <Dashboard />, path: '/app' },
          { text: 'Agendamentos', icon: <CalendarToday />, path: '/app/agendamentos' },
          { text: 'Pacientes', icon: <People />, path: '/app/pacientes' },
          { text: 'Configurações', icon: <Settings />, path: '/app/configuracoes' }
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => history.push(item.path)}
            sx={{
              mb: 1,
              borderRadius: 2,
              '&:hover': {
                background: 'rgba(255,255,255,0.05)'
              }
            }}
          >
            <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
                '& .MuiTypography-root': {
                  fontWeight: 500
                }
              }} 
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<ExitToApp />}
          onClick={handleLogout}
          sx={{
            background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, rgb(96, 165, 250) 0%, rgb(59, 130, 246) 100%)'
            }
          }}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      background: '#0A1929',
      position: 'relative',
      overflow: 'hidden'
    }}>
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

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              background: 'transparent',
              border: 'none'
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              background: 'transparent',
              border: 'none'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 4
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2, 
                display: { md: 'none' },
                color: 'rgba(255,255,255,0.7)'
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #fff 0%, #94A3B8 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Dashboard
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
                '&:hover': {
                  background: 'rgba(255,255,255,0.05)'
                }
              }}
              onClick={handleNotificationsOpen}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            <IconButton
              onClick={handleMenuOpen}
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
                '&:hover': {
                  background: 'rgba(255,255,255,0.05)'
                }
              }}
            >
              <Avatar 
                src={user?.avatar} 
                sx={{ 
                  width: 40, 
                  height: 40,
                  background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%)'
                }}
              >
                {user?.nome?.charAt(0)}
              </Avatar>
            </IconButton>
          </Box>
        </Box>

        {/* Conteúdo Principal */}
        <Grid container spacing={3}>
          {/* Card de Estatísticas */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ 
                background: 'rgba(17, 25, 40, 0.75)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)',
                height: '100%'
              }}>
                <CardContent>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2,
                      color: 'rgba(255,255,255,0.7)',
                      fontWeight: 600
                    }}
                  >
                    Estatísticas
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      background: 'rgba(255,255,255,0.05)'
                    }}>
                      <Typography color="rgba(255,255,255,0.7)">Consultas Hoje</Typography>
                      <Typography variant="h6" color="rgb(59, 130, 246)">12</Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      background: 'rgba(255,255,255,0.05)'
                    }}>
                      <Typography color="rgba(255,255,255,0.7)">Pacientes</Typography>
                      <Typography variant="h6" color="rgb(59, 130, 246)">156</Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      background: 'rgba(255,255,255,0.05)'
                    }}>
                      <Typography color="rgba(255,255,255,0.7)">Agendamentos</Typography>
                      <Typography variant="h6" color="rgb(59, 130, 246)">24</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Card de Próximas Consultas */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card sx={{ 
                background: 'rgba(17, 25, 40, 0.75)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)',
                height: '100%'
              }}>
                <CardContent>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                  }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        fontWeight: 600
                      }}
                    >
                      Próximas Consultas
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      sx={{
                        background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgb(96, 165, 250) 0%, rgb(59, 130, 246) 100%)'
                        }
                      }}
                    >
                      Nova Consulta
                    </Button>
                  </Box>
                  <Stack spacing={2}>
                    {[1, 2, 3].map((item) => (
                      <Box 
                        key={item}
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 2,
                          borderRadius: 2,
                          background: 'rgba(255,255,255,0.05)'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar 
                            sx={{ 
                              width: 40, 
                              height: 40,
                              background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%)'
                            }}
                          >
                            P
                          </Avatar>
                          <Box>
                            <Typography color="rgba(255,255,255,0.9)" fontWeight={500}>
                              Paciente {item}
                            </Typography>
                            <Typography variant="body2" color="rgba(255,255,255,0.5)">
                              09:00 - 10:00
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton sx={{ color: 'rgba(255,255,255,0.5)' }}>
                          <MoreVert />
                        </IconButton>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Card de Pacientes Recentes */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card sx={{ 
                background: 'rgba(17, 25, 40, 0.75)',
                backdropFilter: 'blur(20px)',
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)'
              }}>
                <CardContent>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                  }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        fontWeight: 600
                      }}
                    >
                      Pacientes Recentes
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        size="small"
                        placeholder="Buscar..."
                        InputProps={{
                          startAdornment: (
                            <Search sx={{ color: 'rgba(255,255,255,0.3)', mr: 1 }} />
                          ),
                          sx: {
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: 2,
                            '& input': {
                              color: 'rgba(255,255,255,0.7)'
                            }
                          }
                        }}
                      />
                      <IconButton sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        <FilterList />
                      </IconButton>
                    </Box>
                  </Box>
                  <Grid container spacing={2}>
                    {[1, 2, 3, 4].map((item) => (
                      <Grid item xs={12} sm={6} md={3} key={item}>
                        <Box 
                          sx={{ 
                            p: 2,
                            borderRadius: 2,
                            background: 'rgba(255,255,255,0.05)',
                            textAlign: 'center'
                          }}
                        >
                          <Avatar 
                            sx={{ 
                              width: 64, 
                              height: 64,
                              mx: 'auto',
                              mb: 2,
                              background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%)'
                            }}
                          >
                            P
                          </Avatar>
                          <Typography color="rgba(255,255,255,0.9)" fontWeight={500}>
                            Paciente {item}
                          </Typography>
                          <Typography variant="body2" color="rgba(255,255,255,0.5)">
                            Última consulta: 15/03
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Menu de Notificações */}
      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        PaperProps={{
          sx: {
            background: 'rgba(17, 25, 40, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            minWidth: 300,
            mt: 1
          }
        }}
      >
        <MenuItem onClick={handleNotificationsClose}>
          <Typography color="rgba(255,255,255,0.7)">
            Nova consulta agendada para amanhã
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Typography color="rgba(255,255,255,0.7)">
            Paciente cancelou consulta
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Typography color="rgba(255,255,255,0.7)">
            Novo feedback recebido
          </Typography>
        </MenuItem>
      </Menu>

      {/* Menu do Usuário */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            background: 'rgba(17, 25, 40, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            minWidth: 200,
            mt: 1
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Typography color="rgba(255,255,255,0.7)">
            Meu Perfil
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Typography color="rgba(255,255,255,0.7)">
            Configurações
          </Typography>
        </MenuItem>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <MenuItem onClick={handleLogout}>
          <Typography color="rgba(255,255,255,0.7)">
            Sair
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
} 