import React, { useEffect, useState } from 'react';
import styles from '../css/moderator-page/TaskManagement.module.css';

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    setLoading(true);
    fetch('http://localhost/api/moderator/tasks', {
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

  const handleDelete = (id) => {
    fetch(`http://localhost/api/moderator/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((err) => setError(`Failed to delete task: ${err.message}`));
  };

  const toggleTaskStatus = (id, isEnabled) => {
    fetch(`http://localhost/api/moderator/tasks/${id}/block`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, isEnabled: !isEnabled } : task
          )
        );
      })
      .catch((err) => setError(`Failed to update task status: ${err.message}`));
  };

  if (loading) return <p className={styles.loading}>Loading tasks...</p>;
  if (tasks.length === 0 || error) return <p>No tasks found.</p>;

  return (
    <div>
      <h2>Task Management</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Assigned Users</th>
              <th>Solutions Count</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>
                  <div className={styles.descriptionContainer}>
                    {task.description}
                  </div>
                </td>
                <td>{task.assignedUsersCount}</td>
                <td>{task.solutionCount}</td>
                <td>{task.isEnabled ? 'Active' : 'Blocked'}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={styles.toggleBlockButton}
                    onClick={() => toggleTaskStatus(task.id, task.isEnabled)}
                  >
                    {task.isEnabled ? 'Block' : 'Unblock'}
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

export default TaskManagement;
