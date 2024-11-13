import React, { Component } from 'react';
import CodeInput from './CodeInput';
import OutputDisplay from './OutputDisplay';
import Loader from './compile-loader/Loader';
import Navbar from '../navbar/Navbar';
import { compileCode } from '../../services/compileService';

class Compile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      output: '',
      isLoading: false,
    };
  }

  handleCodeChange = (code) => {
    this.setState({ code });
  };

  handleSubmit = async () => {
    const { code } = this.state;
    const { username } = this.props;

    if (code.trim() === '') {
      this.setState({ output: 'Please enter some code to compile.' });
      return;
    }

    this.setState({ isLoading: true });
    try {
      const result = await compileCode(code);
      this.setState({ output: result.output });

      if (username) {
        await this.saveCompilationResult(username, code, result.output);
      }

    } catch (error) {
      this.setState({ output: `An error occurred during compilation: ${error.message}` });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  saveCompilationResult = async (username, code, output) => {
    try {
      const response = await fetch('/api/user/save-compilation-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, code, output }),
      });

      if (!response.ok) {
        throw new Error('Failed to save compilation result');
      }
      console.log('Compilation result saved successfully');
    } catch (error) {
      console.error('Error saving compilation result:', error.message);
    }
  };

  render() {
    const { code, output, isLoading } = this.state;

    return (
      <>
        <Navbar onCompile={this.handleSubmit} />
        <header className="App-header">
          <CodeInput code={code} setCode={this.handleCodeChange} />
          {isLoading ? <Loader /> : <OutputDisplay output={output} />}
        </header>
      </>
    );
  }
}

export default Compile;
