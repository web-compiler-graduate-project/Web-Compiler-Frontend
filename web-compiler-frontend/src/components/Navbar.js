import React from 'react';
import './Navbar.css';
import CompileButton from './CompileButton';
import LoginButton from './LoginButton';
import BackButton from './BackButton';
import SignUpButton from './SignUpButton';

const Navbar = ({ onCompile }) => {
  // Wyrażenie regularne, które sprawdza, czy aktualna strona to '/register'
  const isRegisterPage = /^\/register(\/.*)?$/.test(window.location.pathname);

  return (
    <div className="navbar">
      <h1>Web C++ Compiler</h1>
      <div className="navbar-buttons">
        <LoginButton />
        {!isRegisterPage && <SignUpButton />}
        {isRegisterPage && <BackButton />}
        {!isRegisterPage && <CompileButton onSubmit={onCompile} />}
      </div>
    </div>
  );
};

export default Navbar;
