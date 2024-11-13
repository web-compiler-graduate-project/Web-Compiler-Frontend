import React, { useEffect, useState } from 'react';
import '../css/user-page/CompileHistory.css';

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

  if (loading) return <p>Loading compilation history...</p>;
  if (history.length === 0 || error) return <p>No compilation history found.</p>;

  return (
    <div>
      <h2>Compile History</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Output</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <pre>{item.code}</pre>
                </td>
                <td>
                  <pre>{item.output}</pre>
                </td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(item.id)}>
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
