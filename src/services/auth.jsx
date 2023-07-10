import { UserManager } from 'oidc-client';

const authService = new UserManager({
  authority: 'https://tioma-microfrontend.uk.auth0.com',
  client_id: 'KOsUUBbRspLheb4aaoLVIeqVZOKyjH9m',
  redirect_uri: `http://localhost:4200/`,
  response_type: 'code',
  scope: 'openid profile email',
});

// Function to initiate the login process
export const login = () => {
    // tioma@mail.com
    // 1234567A!a
  authService.signinRedirect();
};

// Function to handle the callback after successful login
export const handleLoginCallback = async () => {
  const user = await authService.signinRedirectCallback();
  return user;
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const user = authService.getUser();
  return user && !user.expired;
};

// Function to get the user's access token
export const getAccessToken = async () => {
  const user = await authService.getUser();
  return user?.access_token;
};

// Function to logout the user
export const logout = () => {
  authService.signoutRedirect();
};

export default authService;
