import { Switch, Route } from 'react-router-dom';
import AuthHome from './pages/AuthHome';
import CadastroClinica from './pages/CadastroClinica';
import CadastroPaciente from './pages/CadastroPaciente';
import Login from './pages/Login';
import MainApp from './MainApp';
import BuscarClinicas from './pages/BuscarClinicas';
import MeusAgendamentos from './pages/MeusAgendamentos';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={AuthHome} />
      <Route path="/cadastro-clinica" component={CadastroClinica} />
      <Route path="/cadastro-paciente" component={CadastroPaciente} />
      <Route path="/login" component={Login} />
      <Route path="/app" component={MainApp} />
      <Route path="/buscar-clinicas" component={BuscarClinicas} />
      <Route path="/meus-agendamentos" component={MeusAgendamentos} />
    </Switch>
  );
} 