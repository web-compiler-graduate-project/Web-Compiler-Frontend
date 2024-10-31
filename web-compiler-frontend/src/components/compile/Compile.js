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
    if (code.trim() === '') {
      this.setState({ output: 'Please enter some code to compile.' });
      return;
    }
    this.setState({ isLoading: true });
    try {
      const result = await compileCode(code);
      this.setState({ output: result.output });
    } catch (error) {
      this.setState({ output: `An error occurred during compilation: ${error.message}` });
    } finally {
      this.setState({ isLoading: false });
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
