import React from 'react';
import '../css/output-display/OutputDisplay.css';

const OutputDisplay = ({ output }) => (
  <div className="output-container">
    <h2 className="output-title">
      Output:
    </h2>
    <pre className="output-code">
      {output}
    </pre>
  </div>
);

export default OutputDisplay;
