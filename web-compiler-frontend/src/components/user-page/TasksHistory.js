import React, { useEffect, useState } from 'react';
import styles from '../css/user-page/TasksHistory.module.css';

function TasksHistory() {
  const [taskSolutions, setTaskSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewCode, setViewCode] = useState(null);
  const [viewOutput, setViewOutput] = useState(null);

  useEffect(() => {
    fetch('http://localhost/api/user/task-solutions')
      .then((response) => response.json())
      .then((data) => {
        setTaskSolutions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch task solutions.');
        setLoading(false);
      });
  }, []);

  const renderStars = (grade) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <span
          key={i}
          className={`${styles.star} ${i <= grade ? styles.filled : ''}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) return <p className={styles.loading}>Loading task solutions...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (taskSolutions.length === 0) return <p>No task solutions available.</p>;

  return (
    <div className={styles.container}>
      <h2>Task Solutions History</h2>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Task Description</th>
              <th>Grade</th>
              <th>Comments</th>
              <th>Code</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            {taskSolutions.map((solution) => (
              <tr key={solution.id}>
                <td>{solution.taskName}</td>
                <td>
                  <textarea
                    className={styles.descriptionContainer}
                    value={solution.taskDescription || 'No description available.'}
                    readOnly
                  />
                </td>
                <td>{renderStars(solution.grade)}</td>
                <td>{solution.comments || 'No comments available.'}</td>
                <td>
                  <button
                    className={styles.viewButton}
                    onClick={() => setViewCode(solution.code)}
                  >
                    View Code
                  </button>
                </td>
                <td>
                  <button
                    className={styles.viewButton}
                    onClick={() => setViewOutput(solution.output)}
                  >
                    View Output
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewCode && (
        <div className={styles.modal}>
          <pre>{viewCode}</pre>
          <button onClick={() => setViewCode(null)} className={styles.closeButton}>
            ×
          </button>
        </div>
      )}

      {viewOutput && (
        <div className={styles.modal}>
          <pre>{viewOutput}</pre>
          <button
            onClick={() => setViewOutput(null)}
            className={styles.closeButton}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default TasksHistory;
