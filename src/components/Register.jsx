import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if(password != confirmPassword){
        alert("Password doesn't match");
    }else{
        localStorage.setItem(username, password);
    }
  };

  return (
    <div className='reg-form'>
      <form>
        <input className='user-field' placeholder='Username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <input className='pass-field' placeholder='Username' type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          />
        <br />
        <input className='con-pass-field' placeholder='Confirm Password' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        <br />

        <button className='reg-btn' type="button" onClick={handleRegister}>
          Register
        </button>
        <p>Already have an account? <Link to="/">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
