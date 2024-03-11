/*
  Case Study #1
  Submitted By:
  Duhaylungsod, Kyziah Mae S. 
  Garcia, John Charles T. 
  Guevarra, Shane Ashley M. 
  Saturno, M-Jey L.

  The Other Source Codes has File Extension in .jsx 

  Working deployment site:
  https://tool-and-die-shop.vercel.app/
  
*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/Login.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if(password != confirmPassword){
        alert("Password doesn't match");
    }else{
        alert("Register Completed")
        localStorage.setItem(username, password);
    }
  };

  return (
    <><div className="head-text">
      <h1 className='heading-text'>TOOL AND DIESHOP </h1>
      <div className="login-text">SIGN UP PAGE</div>
    </div><div className="bot-text">
        <div className="hello-text">Hello,</div>
        <div className="wel-text">welcome!</div>
      </div><div className='reg-form'>
        <form>
          <input className='user-field' placeholder='Username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <br />
          <input className='pass-field' placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <input className='con-pass-field' placeholder='Confirm Password' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <br />

          <button className='reg-btn' type="button" onClick={handleRegister}>
            Register
          </button>
          <p>Already have an account? <Link to="/">Login</Link></p>
        </form>

        <img className='iso-img' src={"/iso-view.png"} alt="iso-view" />

      </div></>
  );
};

export default Register;
