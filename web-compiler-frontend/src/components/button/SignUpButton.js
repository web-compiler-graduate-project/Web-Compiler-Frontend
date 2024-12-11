import React from 'react';

const SignUpButton = () => {

    const handleClick = () => {
    window.location.href = `${process.env.REACT_APP_HOST}/register/`;
  };

  return (
    <button type="button" className="signup-button" onClick={handleClick}>
      Sign Up
    </button>
  );
};

export default SignUpButton;