import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [currState, setCurrState] = useState("Login");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset error state before making the request

    // Differentiate between Login and Sign Up actions
    const url = currState === "Login" ? '/user/login/admin' : '/user/signup/admin';
    
    axios.post(url, null, {
      params: { username, password }
    })
    .then(response => {
      if (currState === "Login") {
        // Assuming the response includes a token or session identifier
        localStorage.setItem('adminSession', response.data.token); // Save token/session
        navigate('/admin'); // Redirect to admin page upon successful login
      } else {
        setCurrState("Login"); // Redirect to login after successful sign-up
      }
    })
    .catch(error => {
      setError('Invalid credentials');
      console.error('Login/Sign-up error:', error);
    });
  };

  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={handleSubmit}>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='Close' />
        </div>
        <div className='login-popup-inputs'>
          {currState === "Sign Up" && (
            <input 
              type='text' 
              placeholder='Your Name' 
              required 
              onChange={(e) => setUsername(e.target.value)} 
            />
          )}
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder={currState === "Login" ? "Enter Admin Email" : "Your Email"}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By Continuing, I Agree to the Terms of Use & Privacy Policy.</p>
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        
        {error && <p className="error-message">{error}</p>}

        {currState === "Login"
          ? <p>Create a New Account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
          : <p>Already Have an Account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
        }
      </form>
    </div>
  );
};

export default LoginPopup;
