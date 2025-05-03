import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Fade,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import { useHistory } from 'react-router-dom';

export default function AppLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    history.push('/login');
  };

  const menuItems = [
    { text: 'Buscar Clínicas', icon: <SearchIcon />, path: '/buscar-clinicas' },
    { text: 'Meus Agendamentos', icon: <CalendarMonthIcon />, path: '/agendamentos' },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { text: 'Meu Perfil', icon: <PersonIcon />, path: '/perfil' }
  ];

  const userName = JSON.parse(localStorage.getItem('user'))?.nome || '';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          backdropFilter: 'blur(10px)',
          background: 'rgba(13, 25, 41, 0.8)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setDrawerOpen(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography 
              variant="h5" 
              component="div" 
              fontWeight={800}
              sx={{
                background: 'linear-gradient(135deg, #fff 0%, #b0b8c1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              AppSacados
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 4 }}>
              {menuItems.map((item) => (
                <Typography
                  key={item.text}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: '#fff'
                    }
                  }}
                  onClick={() => history.push(item.path)}
                >
                  {item.text}
                </Typography>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              <NotificationsIcon />
            </IconButton>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                '&:hover': {
                  '& .MuiTypography-root': {
                    color: '#fff'
                  }
                }
              }} 
              onClick={handleClick}
            >
              <Avatar sx={{ width: 40, height: 40, bgcolor: '#2196f3' }}>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
              {!isMobile && (
                <>
                  <Typography 
                    sx={{ 
                      ml: 1, 
                      color: 'rgba(255, 255, 255, 0.7)',
                      transition: 'color 0.2s'
                    }}
                  >
                    {userName}
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ color: 'rgba(255, 255, 255, 0.7)', ml: 0.5 }} />
                </>
              )}
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              PaperProps={{
                sx: {
                  background: 'rgba(13, 25, 41, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  mt: 1,
                  '& .MuiMenuItem-root': {
                    color: '#fff',
                    py: 1.5
                  }
                }
              }}
            >
              <MenuItem onClick={() => { handleClose(); history.push('/perfil'); }}>
                Meu Perfil
              </MenuItem>
              <MenuItem onClick={() => { handleClose(); history.push('/configuracoes'); }}>
                Configurações
              </MenuItem>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              <MenuItem onClick={handleLogout}>
                Sair
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'rgba(13, 25, 41, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={800} color="#fff" mb={2}>
            Menu
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                button
                onClick={() => {
                  history.push(item.path);
                  setDrawerOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    background: 'rgba(33, 150, 243, 0.1)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: '#64b5f6', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    sx: { color: '#fff' }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          pt: '64px', // Altura do AppBar
          background: 'radial-gradient(circle at 50% 30%, #23272f 60%, #181a20 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Efeito de gradiente animado */}
        <Box sx={{
          position: 'fixed',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle at center, rgba(33, 150, 243, 0.1) 0%, transparent 50%)',
          animation: 'rotate 30s linear infinite',
          '@keyframes rotate': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }
          },
          zIndex: 0
        }} />

        {/* Conteúdo da página */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
} 