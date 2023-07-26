import { useState } from 'react';
import { Link } from 'react-router-dom';
import { storeTokenInLocalStorage } from '../../utils/common';
import { API_ROUTES } from '../../utils/constants';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setValidationErrors] = useState();

  const signIn = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_ROUTES.SIGN_IN, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        })
      });

      const result = await response.json();

      if (result.error) {
        setValidationErrors(result.error && result.error.payload);
        return;
      }

      storeTokenInLocalStorage(result.payload.token);
      document.cookie = `jwt=${result.payload.token}; domain=.microfrontend.com; path=/;`;
      window.location.href = process.env.REACT_APP_MAIN_URL;
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
          <div className='relative'>
            <input
              className={`w-full border-2 outline-none p-2 rounded-md ${errors && errors.email ? 'border-red-500' : ''}`}
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); }}
            />
            {errors && errors.email && (
              <p className="absolute mt-2 text-red-500 text-sm">
                {errors.email}
              </p>
            )}
          </div>
          <div className='relative'>
            <input
              className={`w-full border-2 outline-none p-2 rounded-md ${errors && errors.password ? 'border-red-500' : ''}`}
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => { setPassword(e.target.value); }}
            />
            {errors && errors.password && (
              <p className="absolute mt-2 text-red-500 text-sm">
                {errors.password}
              </p>
            )}
          </div>

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