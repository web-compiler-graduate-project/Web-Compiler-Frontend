import React, { useEffect, useState } from 'react';
import styles from '../css/user-page/Tasks.module.css';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTaskAssigned, setIsTaskAssigned] = useState(false);

  useEffect(() => {
    checkTaskAssignment();
    fetchTasks();
  }, []);

  const checkTaskAssignment = () => {
  fetch('http://localhost/api/user/is-task-assigned', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.text();
    })
    .then((text) => {
      const assigned = text === 'true';
      setIsTaskAssigned(assigned);
    })
    .catch((err) => setError(`Failed to check task assignment: ${err.message}`));
};


  const fetchTasks = () => {
    setLoading(true);
    fetch('http://localhost/api/user/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleRegister = (taskId) => {
    fetch(`http://localhost/api/user/register-in-task/${taskId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        fetchTasks();
        checkTaskAssignment();
      })
      .catch((err) => setError(`Failed to register in task: ${err.message}`));
  };

  if (loading) return <p className={styles.loading}>Loading tasks...</p>;
  if (error) return <p>No available tasks found.</p>;

  if (isTaskAssigned) {
    return (
      <p className={styles.warning}>
        Please submit the previous task before you pick another.
      </p>
    );
  }

  return (
    <div>
      <h2 className={styles.heading}>Task Management</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td className={styles.buttons}>
                  <button
                    className={styles.registerButton}
                    onClick={() => handleRegister(task.id)}
                  >
                    Register
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tasks;
