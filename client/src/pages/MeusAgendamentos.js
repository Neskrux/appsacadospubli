import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';
import ChatModal from '../components/ChatModal';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';

const agendamentosMock = [
  {
    _id: '1',
    data: new Date(2024, 4, 3, 14, 0),
    clinica: {
      _id: '6633e1b2f1a2b3c4d5e6f7a1',
      nome: 'Clínica Saúde Total',
      setor: 'Odontologia',
      endereco: 'Rua das Flores, 123',
      imagem: 'https://source.unsplash.com/400x300/?clinic,dental'
    },
    tratamento: 'Limpeza',
    status: 'confirmado'
  },
  {
    _id: '2',
    data: new Date(2024, 4, 5, 10, 30),
    clinica: {
      _id: '6633e1b2f1a2b3c4d5e6f7a2',
      nome: 'Centro Médico Bem Estar',
      setor: 'Fisioterapia',
      endereco: 'Av. Principal, 456',
      imagem: 'https://source.unsplash.com/400x300/?clinic,physiotherapy'
    },
    tratamento: 'Ortopédica',
    status: 'pendente'
  }
];

export default function MeusAgendamentos() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openChat, setOpenChat] = useState(false);
  const [clinicaChat, setClinicaChat] = useState(null);
  const [conversas, setConversas] = useState([]);
  const [chatId, setChatId] = useState(null);
  const history = useHistory();

  // Filtra agendamentos do dia selecionado
  const agendamentosDoDia = agendamentosMock.filter(a =>
    a.data.toDateString() === selectedDate.toDateString()
  );

  useEffect(() => {
    async function fetchConversas() {
      try {
        const res = await axios.get('http://localhost:5000/api/chats');
        setConversas(res.data);
      } catch (err) {
        setConversas([]);
      }
    }
    fetchConversas();
  }, []);

  // Função para abrir chat a partir de um agendamento (busca ou cria o chat)
  const handleAbrirChatAgendamento = async (clinica) => {
    try {
      const res = await axios.post('http://localhost:5000/api/chats', { clinicaId: clinica._id });
      setChatId(res.data._id);
      setClinicaChat(clinica);
      setOpenChat(true);
    } catch (err) {
      alert('Erro ao abrir chat!');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#0A1929', py: 6, px: { xs: 1, md: 6 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Botão de voltar */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => history.goBack()}
          sx={{
            mb: 2,
            color: '#3B82F6',
            fontWeight: 700,
            background: 'rgba(59,130,246,0.08)',
            borderRadius: 2,
            px: 2,
            '&:hover': { background: 'rgba(59,130,246,0.18)' }
          }}
        >
          Voltar
        </Button>
        <Typography variant="h4" fontWeight={800} sx={{ color: '#fff', mb: 2, textAlign: 'center' }}>
          <CalendarMonthIcon sx={{ fontSize: 36, mr: 1, verticalAlign: 'middle', color: '#3B82F6' }} />
          Meus Agendamentos
        </Typography>
        <Typography sx={{ color: '#94A3B8', mb: 4, textAlign: 'center' }}>
          Visualize, gerencie e converse com as clínicas sobre seus agendamentos.
        </Typography>

        <Stack direction={isMobile ? 'column' : 'row'} spacing={4} alignItems="flex-start" justifyContent="center">
          {/* Calendário */}
          <Box sx={{ bgcolor: 'rgba(17,25,40,0.85)', borderRadius: 3, p: 3, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)', minWidth: 340 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={selectedDate}
                onChange={setSelectedDate}
                localeText={{ cancelButtonLabel: 'Cancelar', okButtonLabel: 'OK' }}
                slotProps={{
                  actionBar: { actions: [] }
                }}
                sx={{
                  bgcolor: 'transparent',
                  color: '#fff',
                  borderRadius: 2,
                  '& .MuiPickersDay-root': {
                    color: '#fff',
                    fontWeight: 600,
                    borderRadius: 2,
                    '&.Mui-selected': {
                      bgcolor: 'rgb(59, 130, 246) !important',
                      color: '#fff'
                    }
                  },
                  '& .MuiPickersCalendarHeader-label': {
                    color: '#fff',
                    fontWeight: 700
                  },
                  '& .MuiPickersDay-today': {
                    border: '1.5px solid #3B82F6'
                  }
                }}
              />
            </LocalizationProvider>
          </Box>

          {/* Lista de agendamentos */}
          <Box sx={{ flex: 1, minWidth: 320 }}>
            {agendamentosDoDia.length === 0 ? (
              <Card sx={{ bgcolor: 'rgba(17,25,40,0.85)', borderRadius: 3, p: 3, textAlign: 'center', color: '#94A3B8' }}>
                Nenhum agendamento para este dia.
              </Card>
            ) : agendamentosDoDia.map(ag => (
              <Card key={ag._id} sx={{ bgcolor: 'rgba(17,25,40,0.95)', borderRadius: 3, mb: 3, boxShadow: '0 4px 24px 0 rgba(59,130,246,0.08)' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Avatar src={ag.clinica.imagem} sx={{ width: 64, height: 64, mr: 2, border: '2px solid #3B82F6' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: '#fff', mb: 0.5 }}>
                      {ag.clinica.nome}
                    </Typography>
                    <Typography sx={{ color: '#94A3B8', fontSize: 15, mb: 0.5 }}>
                      {ag.clinica.setor} - {ag.tratamento}
                    </Typography>
                    <Typography sx={{ color: '#94A3B8', fontSize: 15 }}>
                      {ag.clinica.endereco}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ color: '#3B82F6', fontWeight: 700, fontSize: 18 }}>
                      {ag.data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                    <Typography sx={{ color: ag.status === 'confirmado' ? 'rgb(21, 128, 61)' : '#facc15', fontWeight: 600, fontSize: 14 }}>
                      {ag.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ChatIcon />}
                      sx={{ mt: 1, background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)', borderRadius: 2, fontWeight: 600 }}
                      onClick={() => handleAbrirChatAgendamento(ag.clinica)}
                    >
                      Chat
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Stack>
      </Box>
      {/* NOVA SEÇÃO: Minhas Conversas */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 6 }}>
        <Typography variant="h5" fontWeight={700} sx={{ color: '#fff', mb: 2 }}>
          Minhas Conversas
        </Typography>
        {conversas.length === 0 ? (
          <Card sx={{ bgcolor: 'rgba(17,25,40,0.85)', borderRadius: 3, p: 3, textAlign: 'center', color: '#94A3B8' }}>
            Nenhuma conversa iniciada.
          </Card>
        ) : (
          <Stack spacing={2}>
            {conversas.map(conv => (
              <Card key={conv._id} sx={{ bgcolor: 'rgba(17,25,40,0.95)', borderRadius: 3, boxShadow: '0 4px 24px 0 rgba(59,130,246,0.08)' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={conv.clinica?.imagem} sx={{ width: 48, height: 48, mr: 2, border: '2px solid #3B82F6' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700} sx={{ color: '#fff', fontSize: 17 }}>
                      {conv.clinica?.nome}
                    </Typography>
                    <Typography sx={{ color: '#94A3B8', fontSize: 14 }}>
                      {conv.clinica?.setor}
                    </Typography>
                    <Typography sx={{ color: '#cbd5e1', fontSize: 14, mt: 0.5 }} noWrap>
                      {conv.lastMessage}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ color: '#3B82F6', fontSize: 13, fontWeight: 600 }}>
                      {new Date(conv.updatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} {new Date(conv.updatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ChatIcon />}
                      sx={{ mt: 1, borderRadius: 2, color: '#3B82F6', borderColor: '#3B82F6', fontWeight: 600, '&:hover': { background: '#1e293b', borderColor: '#1976d2' } }}
                      onClick={() => { setChatId(conv._id); setClinicaChat(conv.clinica); setOpenChat(true); }}
                    >
                      Abrir Chat
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
      {clinicaChat && (
        <ChatModal open={openChat} onClose={() => setOpenChat(false)} clinica={clinicaChat} chatId={chatId} />
      )}
    </Box>
  );
} 