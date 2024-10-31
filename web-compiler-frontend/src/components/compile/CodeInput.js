import React from 'react';
import { Editor } from '@monaco-editor/react';

function CodeInput({ code, setCode }) {
  const handleChange = (value) => {
    setCode(value || '');
  };

  return (
    <Editor
      height="600px"
      defaultLanguage="cpp"
      value={code}
      onChange={handleChange}
      theme="vs-dark"
    />
  );
}

export default CodeInput;
