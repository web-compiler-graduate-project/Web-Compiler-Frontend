import React, { useEffect, useState } from 'react';
import styles from '../css/moderator-page/TaskManagement.module.css';
import SolutionReview from './SolutionReview';

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [selectedSolutions, setSelectedSolutions] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_HOST}/api/moderator/tasks`, {
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

  const handleReviewClick = (solutions) => {
    if (solutions.length > 0) {
      setSelectedSolutions(solutions);
      setShowReview(true);
    } else {
      alert('No solutions available for this task.');
    }
  };

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_HOST}/api/moderator/tasks/${id}`, {
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
    fetch(`${process.env.REACT_APP_HOST}/api/moderator/tasks/${id}/block`, {
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

  const handleGradeSolution = (solutionId, grade, comment) => {
    const gradeRequest = {
      grade: grade,
      comments: comment,
    };

    fetch(`${process.env.REACT_APP_HOST}/api/moderator/solutions/${solutionId}/grade`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gradeRequest),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        alert('Solution graded successfully!');
      })
      .catch((err) => alert(`Failed to grade solution: ${err.message}`));
  };

  if (loading) return <p>Loading tasks...</p>;
  if (tasks.length === 0 || error) return <p>No tasks found.</p>;

  return showReview && selectedSolutions.length > 0 ? (
    <SolutionReview
      solutions={selectedSolutions}
      onBack={() => setShowReview(false)}
      onGrade={handleGradeSolution}
    />
  ) : (
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
                  <textarea
                    className={styles.descriptionContainer}
                    value={task.description}
                    readOnly={true}
                  />
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
                  <button
                    className={styles.reviewButton}
                    onClick={() => handleReviewClick(task.solutions)}
                  >
                    Review Solutions
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
