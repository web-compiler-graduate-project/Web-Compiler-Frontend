import React from 'react';
import '../css/Loader.css';

function ProcessingLoader() {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Processing...</p>
    </div>
  );
}

export default ProcessingLoader;
