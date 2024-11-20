import React, { useEffect, useState } from 'react';
import styles from '../css/user-page/CompileHistory.module.css';

function CompileHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    setLoading(true);
    fetch('http://localhost/api/user/user-compilation-history', {
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
        setHistory(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost/api/user/user-compilation-history/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
      })
      .catch((err) => setError(`Failed to delete item: ${err.message}`));
  };

  if (loading) return <p className={styles.loading}>Loading compilation history...</p>;
  if (history.length === 0 || error) return <p>No compilation history found.</p>;

  return (
    <div>
      <h2 className={styles.heading}>Compile History</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.header}>ID</th>
              <th className={styles.header}>Code</th>
              <th className={styles.header}>Output</th>
              <th className={styles.header}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td className={styles.code}>
                  <div className={styles.scrollable}>
                    <pre>{item.code}</pre>
                  </div>
                </td>
                <td className={styles.output}>
                  <div className={styles.scrollable}>
                    <pre>{item.output}</pre>
                  </div>
                </td>
                <td>
                  <button className={styles.deleteButton} onClick={() => handleDelete(item.id)}>
                    Delete
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

export default CompileHistory;
