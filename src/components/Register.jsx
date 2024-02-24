import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <form>

        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />

        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />

        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
        </label>
        <br />

        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>

      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
};

export default Register;
