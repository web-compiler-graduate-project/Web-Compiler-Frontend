import React from 'react';

const BackButton = () => {

  const handleClick = () => {
    window.location.href = `${process.env.REACT_APP_HOST}/`;
  };

  return (
    <button type="button" className="back-button" onClick={handleClick}>
      Back
    </button>
  );
};

export default BackButton;
