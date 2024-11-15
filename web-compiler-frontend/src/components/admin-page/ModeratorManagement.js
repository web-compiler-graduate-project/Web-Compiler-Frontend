import React, { useEffect, useState } from 'react';
import '../css/admin-page/ModeratorManagement.module.css';

function ModeratorManagement() {
  const [moderators, setModerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModerators();
  }, []);

  const fetchModerators = () => {
    setLoading(true);
    fetch('http://localhost/api/admin/moderators', {
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
        setModerators(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost/api/admin/moderators/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        setModerators((prevModerators) => prevModerators.filter((mod) => mod.id !== id));
      })
      .catch((err) => setError(`Failed to delete moderator: ${err.message}`));
  };

  const toggleBlockStatus = (id, isEnabled) => {
    fetch(`http://localhost/api/admin/moderators/${id}/block?isEnabled=${!isEnabled}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        setModerators((prevModerators) =>
          prevModerators.map((mod) =>
            mod.id === id ? { ...mod, isEnabled: !isEnabled } : mod
          )
        );
      })
      .catch((err) => setError(`Failed to update block status: ${err.message}`));
  };

  if (loading) return <p>Loading moderators...</p>;
  if (moderators.length === 0 || error) return <p>No moderators found.</p>;

  return (
    <div>
      <h2>Moderator Management</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {moderators.map((mod) => (
              <tr key={mod.id}>
                <td>{mod.id}</td>
                <td>{mod.username}</td>
                <td>{mod.email}</td>
                <td>{mod.isEnabled ? 'Active' : 'Blocked'}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(mod.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="toggle-block-button"
                    onClick={() => toggleBlockStatus(mod.id, mod.isEnabled)}
                  >
                    {mod.isEnabled ? 'Block' : 'Unblock'}
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

export default ModeratorManagement;
