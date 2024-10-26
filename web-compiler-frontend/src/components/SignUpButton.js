import React from 'react';

const SignUpButton = () => {

    const handleClick = () => {
    window.location.href = 'http://localhost/register/';
  };

  return (
    <button type="button" className="signup-button" onClick={handleClick}>
      Sign Up
    </button>
  );
};

export default SignUpButton;