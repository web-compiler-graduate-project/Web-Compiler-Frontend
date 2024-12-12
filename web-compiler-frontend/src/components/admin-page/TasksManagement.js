import React, { useEffect, useState } from 'react';
import styles from '../css/admin-page/TaskManagement.module.css';

function TasksManagement() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/admin/tasks`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/admin/tasks/${taskId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete task');
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleBlockTask = async (taskId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/admin/tasks/${taskId}/block`, { method: 'PUT' });
      if (!response.ok) throw new Error('Failed to toggle task status');
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...task, isEnabled: !task.isEnabled } : task))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (tasks.length === 0) return <p>No tasks found.</p>;

  return (
    <div>
      <h2>Tasks Management</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Assigned Users</th>
              <th>Solutions Count</th>
              <th>Moderator Name</th>
              <th>Moderator Email</th>
              <th>Status</th>
              <th>Delete</th>
              <th>Block/Unblock</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>
                  <textarea className={styles.descriptionContainer} value={task.description} readOnly />
                </td>
                <td>{task.assignedUsersCount}</td>
                <td>{task.solutionCount}</td>
                <td>{task.moderatorUserName}</td>
                <td>{task.moderatorEmail}</td>
                <td>{task.isEnabled ? 'Active' : 'Blocked'}</td>
                <td>
                  <button className={styles.deleteButton} onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button
                   className={styles.toggleBlockButton}
                   onClick={() => toggleBlockTask(task.id)}
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

export default TasksManagement;
