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
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png " alt="User" className="user-avatar" />
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
