import React, { Component } from 'react';
import CodeInput from './CodeInput';
import OutputDisplay from './OutputDisplay';
import Loader from './compile-loader/Loader';
import Navbar from '../navbar/Navbar';
import { compileCode } from '../../services/compileService';
import '../css/pop-up/PopUp.css';

class Compile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      output: '',
      isLoading: false,
      isTaskAssigned: false,
      taskDetails: null,
      isPopupExpanded: false,
      isConfirmationVisible: false,
    };
  }

  componentDidMount() {
    this.checkTaskAssignment();
  }

  checkTaskAssignment = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/user/is-task-assigned`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      if (data) {
        const taskResponse = await fetch(`${process.env.REACT_APP_HOST}/api/user/assigned-task-details`);
        const taskDetails = await taskResponse.json();
        this.setState({ isTaskAssigned: true, taskDetails });
      }
    } catch (error) {
      console.error('Error checking task assignment:', error.message);
    }
  };

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

  togglePopupExpansion = () => {
    this.setState((prevState) => ({ isPopupExpanded: !prevState.isPopupExpanded }));
  };

  showConfirmationPopup = () => {
    this.setState({ isConfirmationVisible: true });
  };

  hideConfirmationPopup = () => {
    this.setState({ isConfirmationVisible: false });
  };

  confirmAndSubmitSolution = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/user/submit-solution`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: this.props.username }),
      });

      if (response.status === 201) {
        const result = await response.text();
        console.log(result);
        alert(result);
        window.location.reload();
      } else {
        const errorResult = await response.text();
        console.error(errorResult);
        alert(`Please compile solution one more time.`);
      }
    } catch (error) {
      console.error('Error submitting solution:', error.message);
      alert(`Please compile solution one more time.`);
    } finally {
      this.hideConfirmationPopup();
    }
  };

  renderPopup = () => {
    const { taskDetails, isPopupExpanded } = this.state;
    if (!taskDetails) return null;

    return (
      <div className={`popup ${isPopupExpanded ? 'expanded' : 'collapsed'}`} onClick={this.togglePopupExpansion}>
        <div className="popup-content">
          {isPopupExpanded ? (
            <>
              <h2>{taskDetails.title}</h2>
              <p>{taskDetails.description}</p>
              <p>INFO: Last compilation result stored in history will be treated as solution.</p>
              <button className="submit-solution-button" onClick={this.showConfirmationPopup}>
                Submit
              </button>
            </>
          ) : (
            <div className="popup-arrow">
              {isPopupExpanded ? '' : '←'}
            </div>
          )}
        </div>
      </div>
    );
  };

  renderConfirmationPopup = () => {
    const { isConfirmationVisible } = this.state;
    if (!isConfirmationVisible) return null;

    return (
      <div className="confirmation-popup">
        <div className="confirmation-content">
          <p>Are you sure you want to submit solution? There is no way back.</p>
          <div className="confirmation-buttons">
            <button className="confirm-button" onClick={this.confirmAndSubmitSolution}>
              Yes
            </button>
            <button className="cancel-button" onClick={this.hideConfirmationPopup}>
              No
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { code, output, isLoading, isTaskAssigned } = this.state;

    return (
      <>
        <Navbar onCompile={this.handleSubmit} />
        <header className="App-header">
          {this.renderPopup()}
          {this.renderConfirmationPopup()}
          <CodeInput code={code} setCode={this.handleCodeChange} />
          {isLoading ? <Loader /> : <OutputDisplay output={output} />}
        </header>
      </>
    );
  }
}

export default Compile;
