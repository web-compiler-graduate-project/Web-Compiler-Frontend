import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CodeInput from './components/CodeInput';
import OutputDisplay from './components/OutputDisplay';
import { compileCode } from './services/compileService';
import Loader from './components/Loader';
import { Helmet } from 'react-helmet';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (code.trim() === '') {
      setOutput('Please enter some code to compile.');
      return;
    }
    setIsLoading(true);
    try {
      const result = await compileCode(code);
      setOutput(result.output);
    } catch (error) {
      setOutput(`An error occurred during compilation: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>Web Compiler</title>
          <link rel="icon" href="/favicon.ico" />
        </Helmet>
        <Navbar onCompile={handleSubmit} />
        <header className="App-header">
          <CodeInput code={code} setCode={setCode} />
          {isLoading ? <Loader /> : <OutputDisplay output={output} />}
        </header>
        <Routes>
          {/* Przykładowa strona do której chcesz przekierować */}
          <Route path="/login" element={<div>Login Page</div>} />
          {/* Dodaj inne ścieżki w razie potrzeby */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
