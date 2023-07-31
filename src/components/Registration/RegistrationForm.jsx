import { useState } from 'react';
import { Link } from 'react-router-dom';
import { storeTokenInLocalStorage } from '../../utils/common';
import { API_ROUTES } from '../../utils/constants';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setValidationErrors] = useState();


  const signUp = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(API_ROUTES.SIGN_UP, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName
        })
      });
      const result = await response.json();
      
      if (result.error) {
        setValidationErrors(result.error && result.error.payload && result.error.payload.errors);
        return;
      }

      storeTokenInLocalStorage(result.payload.token);
      document.cookie = `jwt=${result.payload.token}; domain=${process.env.DOMAIN}; path=/;`;
      window.location.href = process.env.REACT_APP_MAIN_URL;
    }
    catch (err) {
      console.log('Some error occured during signing up: ', err);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center signup-page">
      <div className="w-1/2 h-2/3 shadow-lg rounded-md bg-white p-8 flex flex-col">
        <h2 className="text-center font-medium text-2xl mb-4">
          Sign Up
        </h2>
        <div className="flex flex-1 flex-col justify-evenly">
          <div className='relative'>
            <input
              className={`w-full border-2 outline-none p-2 rounded-md ${errors && errors.firstName ? 'border-red-500' : ''}`}
              type="email"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); }}
            />
            {errors && errors.firstName && (
              <p className="absolute mt-2 text-red-500 text-sm">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className='relative'>
            <input
              className={`w-full border-2 outline-none p-2 rounded-md ${errors && errors.lastName ? 'border-red-500' : ''}`}
              type="email"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value); }}
            />
            {errors && errors.lastName && (
              <p className="absolute mt-2 text-red-500 text-sm">
                {errors.lastName.message}
              </p>
            )}
          </div>
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
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='relative'>
            <input
              className={`w-full border-2 outline-none p-2 rounded-md ${errors && errors.password ? 'border-red-500' : ''}`}
              type="password"
              placeholder="*******" value={password}
              onChange={(e) => { setPassword(e.target.value); }}
            />
            {errors && errors.password && (
              <p className="absolute mt-2 text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            className="
             flex justify-center
             p-2 rounded-md w-1/2 self-center
             bg-gray-800  text-white 
             hover:bg-gray-700"
            onClick={signUp}
          >
            {
              isLoading ?
                <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
            }
            <span>
              SIGN UP
            </span>
          </button>
        </div>
        <div className="text-center text-sm">
          Already a User?
          <Link to="/login">
            <span className="font-medium text-gray-800 ml-1">
              Sign In
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;