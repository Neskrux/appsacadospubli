const API_BASE_URL = process.env.REACT_APP_API_URL || window.location.origin;

export const API_URLS = {
  login: `${API_BASE_URL}/api/auth/login`,
  cadastroClinica: `${API_BASE_URL}/api/auth/cadastro-clinica`,
  cadastroPaciente: `${API_BASE_URL}/api/auth/cadastro-paciente`,
  chats: `${API_BASE_URL}/api/chats`,
  clinicas: `${API_BASE_URL}/api/clinicas`,
  setores: `${API_BASE_URL}/api/setores`
};

export default API_URLS; 