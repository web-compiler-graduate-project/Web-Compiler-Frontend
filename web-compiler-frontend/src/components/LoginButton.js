import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/user/');
  };

  return (
    <button type="button" className="login-button" onClick={handleClick}>
      Log In
    </button>
  );
};

export default LoginButton;
