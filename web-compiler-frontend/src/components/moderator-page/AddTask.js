import React, { useState } from 'react';
import '../css/moderator-page/AddTask.css';
import ProcessingLoader from '../processing-loader/ProcessingLoader';

const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    const newTask = {
      title: taskName,
      description: taskDescription,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/moderator/add-task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        setError('Failed to add task. Please try again.');
        setLoading(false);
        return;
      }

      setSuccessMessage('Task added successfully!');
      setTaskName('');
      setTaskDescription('');
      setLoading(false);
    } catch (error) {
      setError('Network error: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="add-task-component">
      <form onSubmit={handleSubmit} className="add-task-form">
        <h2>Add Task</h2>
        <div className="form-group">
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="taskDescription">Task Description:</label>
          <textarea
            id="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {loading && <ProcessingLoader />}

        <button type="submit" className="submit-button" disabled={loading}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
