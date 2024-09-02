import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [username, setUsername] = useState(""); // New state for username
  const [userEmail, setUserEmail] = useState(""); // New state for email
  const [password, setPassword] = useState(""); // New state for password
  const [userType, setUserType] = useState("customer"); // New state for user type
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username, userEmail, password, userType };

    if (currState === "Sign up") {
      try {
        const response = await fetch('/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          setCurrState("Login");
        } else {
          console.error('Signup failed');
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    } else {
      // Login logic here

      if (userType === "admin") {
        navigate('/admin');
      } else if (userType === "staff") {
        navigate('/staff');
      }
    }
  };

  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={handleSubmit}>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign up" && (
            <>
              <input
                type="text"
                placeholder='Your Name'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder='Your Email'
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder='Your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {currState === "Login" && (
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
          )}
        </div>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>

        <button type="submit">
          {currState === "Sign up" ? "Create account" : "Login"}
        </button>

        {currState === "Login"
          ? <p>Create new Account? <span onClick={() => setCurrState("Sign up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  );
}

export default LoginPopup;
