const API_URL = 'http://localhost:4000';

export const API_ROUTES = {
  SIGN_UP: `${API_URL}/auth/registration`,
  SIGN_IN: `${API_URL}/auth/login`,
  GET_USER: `${API_URL}/auth/user`,
}

export const APP_ROUTES = {
  REGISTRATION: '/registration',
  LOGIN: '/login',
}