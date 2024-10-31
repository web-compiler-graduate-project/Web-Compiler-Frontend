import React from 'react';

const BackButton = () => {

  const handleClick = () => {
    window.location.href = 'http://localhost/';
  };

  return (
    <button type="button" className="back-button" onClick={handleClick}>
      Back
    </button>
  );
};

export default BackButton;
