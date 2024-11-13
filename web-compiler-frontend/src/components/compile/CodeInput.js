import React from 'react';
import { Editor } from '@monaco-editor/react';
import '../css/code-input/CodeInput.css';

function CodeInput({ code, setCode }) {
  const handleChange = (value) => {
    setCode(value || '');
  };

  return (
    <div className="code-input-container">
      <Editor
        height="600px"
        defaultLanguage="cpp"
        value={code}
        onChange={handleChange}
        theme="vs-dark"
      />
    </div>
  );
}

export default CodeInput;
