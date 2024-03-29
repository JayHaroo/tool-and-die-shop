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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Login.css";

const Login = () => {
  // Variable Fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  //This Function handles the login function
  const handleLogin = () => {
    let isAdminLogin = false; // Initialize isAdminLogin flag

    // Check if the username and password fields contain 'admin'
    if (username === "admin" && password === "admin") {
      navigate("/inventory");
    } else {
      // Perform authentication logic here
      // For demonstration, assume authentication is successful if username and password are 'admin'
      for (var i = 0; i < localStorage.length; i++) {
        if (
          localStorage.key(i) == username &&
          localStorage.getItem(localStorage.key(i)) == password
        ) {
          localStorage.setItem("username", username);
          alert("login successful");
          setIsLoggedIn(true);
          setAdminLogin = true; // Set isAdminLogin to true if username and password are 'admin'
          break;
        }
      }

      if (!isLoggedIn) {
        alert("login failed");
      }
    }
  };

  return (
    <>
      <div className="head-text">
        <h1 className="heading-text">TOOL AND DIESHOP </h1>
        <div className="login-text">LOGIN PAGE</div>
      </div>
      <div className="bot-text">
        <div className="hello-text">Hello,</div>
        <div className="wel-text">welcome!</div>
      </div>
      <div className="login-form">
        <form>
          <input
            className="user-field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <br />

          <input
            className="pass-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br />

          <div className="btn">
            <button className="login-btn" type="button" onClick={handleLogin}>
              Login
            </button>
            {isLoggedIn ? (
              navigate("/order")
            ) : (
              <Link to="/register">
                <button className="signup-btn" type="button">
                  Sign Up
                </button>
              </Link>
            )}
          </div>
        </form>
        <img className="iso-img" src={"/iso-view.png"} alt="iso-view" />
      </div>
    </>
  );
};

export default Login;
