import { useState } from 'react';
import { API_ROUTES } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { navigateToExternalSite, storeTokenInLocalStorage } from '../../utils/common';

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
      // const response = await fetch(API_ROUTES.SIGN_UP, {
      const response = await fetch('http://localhost:5000/auth/registration', {
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
        setValidationErrors(result.error && result.error.statusMessage);
        return;
      }

      storeTokenInLocalStorage(result.payload.token);
      document.cookie = `jwt=${result.payload.token}; domain=.microfrontend.com; path=/;`;

      // Redirect to the Angular app
      window.location.href = 'http://main.microfrontend.com';
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
          <input
            className="border-2 outline-none p-2 rounded-md"
            type="email"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value); }}
          />
          <input
            className="border-2 outline-none p-2 rounded-md"
            type="email"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => { setLastName(e.target.value); }}
          />
          <input
            className="border-2 outline-none p-2 rounded-md"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); }}
          />
          {
            errors && errors.email ? <p>{errors.email.message}</p> : null
          }
          <input
            className="border-2 outline-none p-2 rounded-md"
            type="password"
            placeholder="*******" value={password}
            onChange={(e) => { setPassword(e.target.value); }}
          />
          {
            errors && errors.password ? <p>{errors.password.message}</p> : null
          }

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