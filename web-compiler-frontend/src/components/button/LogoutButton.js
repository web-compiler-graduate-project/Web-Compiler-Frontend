import React from 'react';

const LogoutButton = () => {

    const handleClick = () => {
    window.location.href = 'http://localhost/logout';
  };

  return (
    <button type="button" className="logout-button" onClick={handleClick}>
      Logout
    </button>
  );
};

export default LogoutButton;