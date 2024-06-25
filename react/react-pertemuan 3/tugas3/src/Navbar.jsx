import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="header-left">
        <h1 style={{ color: 'white', margin: 0 }}>Harry Potter dan Batu Bertuah</h1>
      </div>
      <ul className="navbar-list">
        <li className="navbar-item"><a href="#home">Home</a></li>
        <li className="navbar-item"><a href="#about">About</a></li>
        <li className="navbar-item"><a href="#services">Services</a></li>
        <li className="navbar-item"><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
