import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const CompileButton = ({ onSubmit }) => (
  <button type="button" className="compile-button" onClick={onSubmit}>
    <FontAwesomeIcon icon={faPlay} />
  </button>
);

export default CompileButton;
