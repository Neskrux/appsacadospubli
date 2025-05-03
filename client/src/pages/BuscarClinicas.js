import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Autocomplete,
  Chip,
  Rating,
  IconButton,
  InputAdornment,
  Skeleton,
  useTheme,
  useMediaQuery,
  Stack,
  Paper,
  Divider,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FilterListIcon from '@mui/icons-material/FilterList';
import StarIcon from '@mui/icons-material/Star';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useHistory } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import TuneIcon from '@mui/icons-material/Tune';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatModal from '../components/ChatModal';

const setores = [
  'Odontologia',
  'Fisioterapia',
  'Psicologia',
  'Nutrição',
  'Dermatologia',
  'Oftalmologia',
  'Cardiologia',
  'Ortopedia',
  'Pediatria',
  'Ginecologia'
];

const tratamentos = {
  'Odontologia': ['Limpeza', 'Canal', 'Extração', 'Clareamento', 'Ortodontia'],
  'Fisioterapia': ['Ortopédica', 'Neurológica', 'Respiratória', 'Esportiva'],
  'Psicologia': ['Terapia Individual', 'Terapia de Casal', 'Terapia Infantil'],
  'Nutrição': ['Reeducação Alimentar', 'Nutrição Esportiva', 'Nutrição Clínica'],
  'Dermatologia': ['Consulta', 'Procedimentos Estéticos', 'Tratamentos a Laser'],
  'Oftalmologia': ['Consulta', 'Exames', 'Cirurgias'],
  'Cardiologia': ['Consulta', 'Check-up', 'Exames'],
  'Ortopedia': ['Consulta', 'Fisioterapia', 'Cirurgia'],
  'Pediatria': ['Consulta', 'Vacinação', 'Check-up'],
  'Ginecologia': ['Consulta', 'Exames', 'Procedimentos']
};

export default function BuscarClinicas() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedSetor, setSelectedSetor] = useState(null);
  const [selectedTratamentos, setSelectedTratamentos] = useState([]);
  const [clinicas, setClinicas] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [distance, setDistance] = useState(10);
  const [sortBy, setSortBy] = useState('relevance');
  const [openChat, setOpenChat] = useState(false);
  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    // Simular chamada à API
    setTimeout(() => {
      setClinicas([
        {
          _id: "6633e1b2f1a2b3c4d5e6f7a1",
          nome: 'Clínica Saúde Total',
          endereco: 'Rua das Flores, 123',
          setor: 'Odontologia',
          tratamentos: ['Limpeza', 'Canal', 'Extração'],
          rating: 4.8,
          reviews: 128,
          imagem: 'https://source.unsplash.com/400x300/?clinic,dental',
          distancia: '2.5 km',
          horario: '08:00 - 18:00'
        },
        {
          _id: "6633e1b2f1a2b3c4d5e6f7a2",
          nome: 'Centro Médico Bem Estar',
          endereco: 'Av. Principal, 456',
          setor: 'Fisioterapia',
          tratamentos: ['Ortopédica', 'Neurológica'],
          rating: 4.5,
          reviews: 96,
          imagem: 'https://source.unsplash.com/400x300/?clinic,physiotherapy',
          distancia: '1.8 km',
          horario: '07:00 - 19:00'
        }
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: '#0A1929',
        position: 'relative',
        overflow: 'hidden',
        pb: 8
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
          zIndex: -1,
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
          zIndex: -2,
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

      {/* Header de Busca */}
      <Paper 
        elevation={0}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backdropFilter: 'blur(20px)',
          background: 'rgba(17, 25, 40, 0.75)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          py: 4,
          px: { xs: 2, md: 6 },
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)'
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <IconButton
              onClick={() => history.goBack()}
              sx={{
                color: 'rgba(255,255,255,0.7)',
                mr: 2,
                '&:hover': {
                  color: '#fff',
                  background: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography 
              variant="h4" 
              component="h1" 
              fontWeight={800} 
              sx={{ 
                textAlign: 'center',
                flex: 1,
                background: 'linear-gradient(135deg, #fff 0%, #94A3B8 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px'
              }}
            >
              Encontre a Clínica Ideal
            </Typography>
          </Box>

          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              borderRadius: 3,
              border: '1px solid rgba(255,255,255,0.1)',
              p: 3,
              mb: 3
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Buscar por nome da clínica..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: 'rgba(255,255,255,0.03)',
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.1)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(96, 165, 250, 0.5)',
                      },
                      '& input': {
                        color: 'rgba(255,255,255,0.9)',
                        '&::placeholder': {
                          color: 'rgba(255,255,255,0.5)',
                          opacity: 1
                        }
                      }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Localização..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: 'rgba(255,255,255,0.03)',
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.1)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(96, 165, 250, 0.5)',
                      },
                      '& input': {
                        color: 'rgba(255,255,255,0.9)',
                        '&::placeholder': {
                          color: 'rgba(255,255,255,0.5)',
                          opacity: 1
                        }
                      }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined">
                  <Select
                    value={selectedSetor || ''}
                    onChange={(e) => {
                      setSelectedSetor(e.target.value);
                      setSelectedTratamentos([]);
                    }}
                    displayEmpty
                    startAdornment={
                      <InputAdornment position="start">
                        <LocalHospitalIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                      </InputAdornment>
                    }
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.03)',
                      borderRadius: 2,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.1)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(96, 165, 250, 0.5)',
                      },
                      '& .MuiSelect-select': {
                        color: 'rgba(255,255,255,0.9)',
                      },
                      '& .MuiSvgIcon-root': {
                        color: 'rgba(255,255,255,0.5)',
                      }
                    }}
                    renderValue={(selected) => {
                      if (!selected) {
                        return <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>Selecione o setor</Typography>;
                      }
                      return selected;
                    }}
                  >
                    {setores.map((setor) => (
                      <MenuItem key={setor} value={setor}>
                        {setor}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {selectedSetor && (
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={tratamentos[selectedSetor] || []}
                    value={selectedTratamentos}
                    onChange={(event, newValue) => setSelectedTratamentos(newValue)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          sx={{
                            background: 'rgba(96, 165, 250, 0.2)',
                            borderColor: 'rgba(96, 165, 250, 0.3)',
                            color: '#fff',
                            '&:hover': {
                              background: 'rgba(96, 165, 250, 0.3)',
                            }
                          }}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Selecione os tratamentos"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <InputAdornment position="start">
                                <FilterListIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                          sx: {
                            bgcolor: 'rgba(255,255,255,0.03)',
                            borderRadius: 2,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(255,255,255,0.1)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(255,255,255,0.2)',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(96, 165, 250, 0.5)',
                            }
                          }
                        }}
                      />
                    )}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleSearch}
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%)',
                    fontSize: 16,
                    fontWeight: 600,
                    borderRadius: 2,
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgb(96, 165, 250) 0%, rgb(59, 130, 246) 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.03)',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '& .MuiSelect-select': {
                    color: 'rgba(255,255,255,0.9)',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'rgba(255,255,255,0.5)',
                  }
                }}
              >
                <MenuItem value="relevance">Mais relevantes</MenuItem>
                <MenuItem value="rating">Melhor avaliação</MenuItem>
                <MenuItem value="distance">Mais próximas</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Paper>

      {/* Resultados */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, px: { xs: 2, md: 6 } }}>
        <Grid container spacing={3}>
          {loading ? (
            // Skeletons para loading
            Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    background: 'rgba(17, 25, 40, 0.75)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 3,
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 48px 0 rgba(59, 130, 246, 0.3)'
                    }
                  }}
                >
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" height={32} width="80%" />
                    <Skeleton variant="text" height={24} width="60%" />
                    <Stack direction="row" spacing={1} mt={2}>
                      <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                      <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : clinicas.map((clinica) => (
            <Grid item xs={12} sm={6} md={4} key={clinica._id}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: 'rgba(17, 25, 40, 0.75)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 48px 0 rgba(59, 130, 246, 0.3)'
                  },
                  overflow: 'visible'
                }}
              >
                <Box 
                  sx={{ 
                    height: 200, 
                    backgroundImage: `url(${clinica.imagem})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '12px 12px 0 0',
                    position: 'relative'
                  }} 
                />
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h6" 
                    fontWeight={600}
                    sx={{ 
                      color: '#fff',
                      mb: 1
                    }}
                  >
                    {clinica.nome}
                  </Typography>

                  <Typography 
                    sx={{ 
                      mb: 2, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.875rem'
                    }}
                  >
                    <LocationOnIcon sx={{ fontSize: 16 }} />
                    {clinica.endereco}
                  </Typography>

                  <Stack direction="row" spacing={1} mb={2}>
                    <Chip 
                      label={clinica.setor}
                      size="small"
                      sx={{
                        background: 'rgba(59, 130, 246, 0.15)',
                        color: '#fff',
                        borderRadius: 1,
                        height: 24
                      }}
                    />
                    {clinica.tratamentos.map((tratamento, index) => (
                      <Chip
                        key={index}
                        label={tratamento}
                        size="small"
                        sx={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          color: 'rgba(255,255,255,0.7)',
                          borderRadius: 1,
                          height: 24
                        }}
                      />
                    ))}
                  </Stack>

                  <Stack 
                    direction="row" 
                    alignItems="center" 
                    spacing={2}
                    sx={{
                      mb: 3,
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.875rem'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOnIcon sx={{ fontSize: 16 }} />
                      {clinica.distancia}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 16 }} />
                      {clinica.horario}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <StarIcon sx={{ fontSize: 16, color: '#3B82F6' }} />
                      {clinica.rating} ({clinica.reviews})
                    </Box>
                  </Stack>

                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ChatIcon />}
                    onClick={() => {
                      setClinicaSelecionada({ ...clinica, setor: selectedSetor, tratamento: selectedTratamentos[0] });
                      setOpenChat(true);
                    }}
                    sx={{
                      background: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%)',
                      color: '#fff',
                      py: 1,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      position: 'relative',
                      zIndex: 9999,
                      pointerEvents: 'auto',
                      '&:hover': {
                        background: 'linear-gradient(135deg, rgb(96, 165, 250) 0%, rgb(59, 130, 246) 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
                      }
                    }}
                  >
                    Enviar mensagem
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {clinicaSelecionada && (
        <ChatModal
          open={openChat}
          onClose={() => setOpenChat(false)}
          clinica={clinicaSelecionada}
        />
      )}
    </Box>
  );
} 