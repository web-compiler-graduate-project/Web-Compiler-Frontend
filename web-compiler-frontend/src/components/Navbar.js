import React from 'react';
import './Navbar.css';
import CompileButton from './CompileButton';
import LoginButton from './LoginButton';

const Navbar = ({ onCompile }) => {
  return (
    <div className="navbar">
      <h1>Web C++ Compiler</h1>
      <div className="navbar-buttons">
        <LoginButton /> {}
        <CompileButton onSubmit={onCompile} /> {}
      </div>
    </div>
  );
};

export default Navbar;
