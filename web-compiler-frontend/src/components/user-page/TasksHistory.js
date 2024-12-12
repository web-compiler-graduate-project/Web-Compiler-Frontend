import React, { useEffect, useState } from 'react';
import styles from '../css/user-page/TasksHistory.module.css';

function TasksHistory() {
  const [taskSolutions, setTaskSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewCode, setViewCode] = useState(null);
  const [viewOutput, setViewOutput] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/api/user/task-solutions`)
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

  if (loading) return <p>Loading task solutions...</p>;
  if (error) return <p>{error}</p>;
  if (taskSolutions.length === 0) return <p>No task solutions available.</p>;

  return (
    <div className={styles.container}>
      <h2>Task Solutions History</h2>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
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
                    className={styles.customTextarea}
                    value={solution.taskDescription || 'No description available.'}
                    readOnly
                  />
                </td>
                <td>{renderStars(solution.grade)}</td>
                <td>
                   <textarea
                     className={styles.customTextarea}
                     value={solution.comments || 'No comments available.'}
                     readOnly
                   />
                </td>
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
