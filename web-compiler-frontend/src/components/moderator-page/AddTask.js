import React from 'react';

function AddTask() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logika dodawania zadania
    console.log('Task added!');
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input type="text" id="taskName" name="taskName" required />
        </div>
        <div>
          <label htmlFor="taskDescription">Task Description:</label>
          <textarea id="taskDescription" name="taskDescription" required></textarea>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
