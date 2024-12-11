import React from 'react';

const LoginButton = () => {

  const handleClick = () => {
    window.location.href = `${process.env.REACT_APP_HOST}/login/`;
  };

  return (
    <button type="button" className="login-button" onClick={handleClick}>
      Log In
    </button>
  );
};

export default LoginButton;
