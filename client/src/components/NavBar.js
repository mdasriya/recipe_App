// NavBar.js

import React, {useState } from 'react';
import '../style/NavBar.css'; // You will create this CSS file for styling
import { useNavigate } from 'react-router-dom';




const NavBar = () => {
    const navigate = useNavigate()
    let user = localStorage.getItem("userData");
    let obj = JSON.parse(user);

    const handleLogout = () => {
      localStorage.clear()
      alert("logout success")
      navigate("/")
    }

  return (
    <nav className="navbar">
      <div className="left">
     <h2 onClick={()=>navigate("/")}>Your Recipe </h2>
      </div>
      <div className="right">
     
        <div className="profile-dropdown">
          <div className='center_profile'>
          <img src="https://images.unsplash.com/photo-1578979879663-4ba6a968a50a?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User" className="user-avatar" />
          <span className="dropdown-button">{obj?.user}</span>
          </div>
          <div className="dropdown-content">
            <button className="dropdown-item" onClick={()=>navigate("/fav_recipe")}>Wishlist</button>
            <button className="dropdown-item" onClick={handleLogout}>Logout</button>
          </div>
        
        </div>
        <button className="login-button" onClick={()=>navigate("/login")}>Login</button>
      </div>
    </nav>

  

  );
};

export default NavBar;
