import React from 'react';
import '../css/Navbar.css';
import CompileButton from '../button/CompileButton';
import LoginButton from '../button/LoginButton';
import BackButton from '../button/BackButton';
import SignUpButton from '../button/SignUpButton';

const Navbar = ({ onCompile }) => {
  const isRegisterPage = /^\/register(\/.*)?$/.test(window.location.pathname);
  const isUserPage = /^\/user(\/.*)?$/.test(window.location.pathname);

  return (
    <div className="navbar">
      <h1>Web C++ Compiler</h1>
      <div className="navbar-buttons">
        {!isUserPage && <LoginButton />}
        {!isRegisterPage && !isUserPage && <SignUpButton />}
        {isRegisterPage && <BackButton />}
        {!isRegisterPage && <CompileButton onSubmit={onCompile} />}
      </div>
    </div>
  );
};

export default Navbar;
