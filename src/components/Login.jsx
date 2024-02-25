// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Login.css'

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   let callFunc = false;

//   const handleLogin = () => {
//     for (var i = 0; i < localStorage.length; i++){
//         if(localStorage.key(i) == username && localStorage.getItem(localStorage.key(i)) == password){
//             alert("login successgul");
//             setIsLoggedIn(true);
//             callFunc = true;
//             break;
//         }       
//     }

//     if(!isLoggedIn){
//         alert("login failed");
//     }
//   };

//   return (
//     <div className='body-class'>
//       <form>
        
//         <label>
//           Username:
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
//         </label>
//         <br />
        
//         <label>
//           Password:
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <br />
        
        
        
//         <button type="button" onClick={handleLogin}>
//             Login
//         </button>
        
//         </form>
//         <p>Don't have an account? <Link to="/register">Register</Link></p>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform authentication logic here
    // For demonstration, assume authentication is successful if username and password are 'admin'
    for (var i = 0; i < localStorage.length; i++){
        if(localStorage.key(i) == username && localStorage.getItem(localStorage.key(i)) == password){
            alert("login successful");
            setIsLoggedIn(true);
            callFunc = true;
            break;
        }       
    }
    if(!isLoggedIn){
        alert("login failed");
    }
  };

  return (
    <div className='login-form'>
      <form>
          <input
          className='user-field'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
        <br />
    
          <input
            className='pass-field'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />

        <br />

        <button className='login-btn' type="button" onClick={handleLogin}>
          Login
        </button>
        {isLoggedIn ? ( 
          <p>Click Here <Link to="/order">Redirect Here</Link></p>
        ) : (
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        )}
      </form>
    </div>
  );
};

export default Login;
