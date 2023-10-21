// LoginForm.js

import React, { useState } from 'react';
import '../style/LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate()
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, pass:password }
    axios.post("https://thoughtful-fawn-slippers.cyclic.app/user/login", data)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("userData", JSON.stringify(res.data))
       localStorage.setItem("token", res.data.token)
        alert(res.data.msg)
        if(res.data.token){
          navigate("/")
        }
      })
    setEmail("")
    setPassword("")
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
      <h2>User Login</h2>
        <div className="form-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
        <div className='redirect'>
            <p>New User </p>
        <Link to={"/register"}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;


