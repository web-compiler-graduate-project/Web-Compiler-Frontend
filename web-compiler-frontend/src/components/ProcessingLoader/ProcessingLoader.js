import React from 'react';
import '../Loader.css';

function ProcessingLoader() {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Processing...</p>
    </div>
  );
}

export default ProcessingLoader;
