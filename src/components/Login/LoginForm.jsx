import { useState } from 'react';
import { Link } from 'react-router-dom';
import { storeTokenInLocalStorage } from '../../utils/common';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    try {
      setIsLoading(true);
      // const response = await fetch(API_ROUTES.SIGN_IN, {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        })
      });

      const result = await response.json();

      if (result.error) {
        console.log('Something went wrong during signing in: ', response);
        return;
      }

      storeTokenInLocalStorage(result.payload.token);
      document.cookie = `jwt=${result.payload.token}; domain=.microfrontend.com; path=/;`;

      // Redirect to the Angular app
      window.location.href = 'http://main.microfrontend.com';
    }
    catch (err) {
      console.log('Some error occured during signing in: ', err);
    }
    finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-full h-screen flex justify-center items-center signin-page">
          <div className="w-1/2 h-1/2 shadow-lg rounded-md bg-white p-8 flex flex-col">
            <h2 className="text-center font-medium text-2xl mb-4">
              Sign in
            </h2>
            <div className="flex flex-1 flex-col justify-evenly">
              <input
                className="border-2 outline-none p-2 rounded-md"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); }}
              />
              <input
                className="border-2 outline-none p-2 rounded-md"
                type="password"
                placeholder="*******" value={password}
                onChange={(e) => { setPassword(e.target.value); }}
              />
    
              <button
                className="
                flex justify-center
                p-2 rounded-md w-1/2 self-center
                bg-gray-800  text-white hover:bg-gray-800"
                onClick={signIn}
              >
                {
                  isLoading ?
                    <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
                }
                <span>
                  SIGN IN
                </span>
              </button>
            </div>
            <div className="text-center text-sm">
              Not a User?
              <Link to="/registration">
                <span className="font-medium text-gray-800 ml-1">
                  Sign Up
                </span>
              </Link>
            </div>
          </div>
    </div >
  );
}

export default LoginForm;