import React from 'react';
import '../../css/Loader.css';

function Loader() {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Compiling...</p>
    </div>
  );
}

export default Loader;
