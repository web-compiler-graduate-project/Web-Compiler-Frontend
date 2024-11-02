import React from 'react';

const LoginButton = () => {

  const handleClick = () => {
    window.location.href = 'http://localhost/login/';
  };

  return (
    <button type="button" className="login-button" onClick={handleClick}>
      Log In
    </button>
  );
};

export default LoginButton;
