
import React, { useState } from 'react';
import '../style/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
const Register = () => {

  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { name, email, pass: password }
    await axios.post("https://thoughtful-fawn-slippers.cyclic.app/user/register", data)
      .then(res => {
        console.log(res.data)
        alert(res.data.msg)
        navigate("/login")
      })
    setName("")
    setEmail("")
    setPassword("")

  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
            required
          />
        </div>
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
        <button type="submit">Register</button>
        <div className='redirect'>
          <p>Already User </p>
          <Link to={"/login"}>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
