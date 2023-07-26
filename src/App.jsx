import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { APP_ROUTES } from './utils/constants';
import LoginForm from './components/Login/LoginForm';
import RegistrationForm from './components/Registration/RegistrationForm';
import './App.css';
import Logout from './components/Logout/Logout';

function App() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (token && location.pathname !== '/logout') {
    window.location.href = process.env.REACT_APP_MAIN_URL;
  }

  return (
    <Routes>
      <Route exact path="/" element={<Navigate to={APP_ROUTES.LOGIN} />} />
      <Route path={APP_ROUTES.REGISTRATION} element={<RegistrationForm />} />
      <Route path={APP_ROUTES.LOGIN} element={<LoginForm />} />
      <Route path='/logout' element={<Logout />} />
    </Routes>
  );
}

export default App;
