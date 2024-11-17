import React, { useEffect, useState } from 'react';
import styles from '../css/admin-page/UserManagement.module.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch('http://localhost/api/admin/users', {
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
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((err) => setError(`Failed to delete user: ${err.message}`));
  };

  const toggleBlockStatus = (id, isEnabled) => {
    fetch(`http://localhost/api/admin/users/${id}/block?isEnabled=${!isEnabled}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, isEnabled: !isEnabled } : user
          )
        );
      })
      .catch((err) => setError(`Failed to update block status: ${err.message}`));
  };

  if (loading) return <p className={styles.loading}>Loading users...</p>;
  if (users.length === 0 || error) return <p>No users found.</p>;

  return (
    <div>
      <h2 className={styles.heading}>User Management</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
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
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isEnabled ? 'Active' : 'Blocked'}</td>
                <td className={styles.buttons}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    className={styles.toggleBlockButton}
                    onClick={() => toggleBlockStatus(user.id, user.isEnabled)}
                  >
                    {user.isEnabled ? 'Block' : 'Unblock'}
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

export default UserManagement;
