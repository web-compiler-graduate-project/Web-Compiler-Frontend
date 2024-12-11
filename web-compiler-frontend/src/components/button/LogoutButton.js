import React from 'react';

const LogoutButton = () => {

    const handleClick = () => {
    window.location.href = `${process.env.REACT_APP_HOST}/logout`;
  };

  return (
    <button type="button" className="logout-button" onClick={handleClick}>
      Logout
    </button>
  );
};

export default LogoutButton;