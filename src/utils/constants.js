const API_URL = process.env.REACT_APP_API_URL;

export const API_ROUTES = {
  SIGN_UP: `${API_URL}/auth/registration`,
  SIGN_IN: `${API_URL}/auth/login`,
}

export const APP_ROUTES = {
  REGISTRATION: '/registration',
  LOGIN: '/login',
}