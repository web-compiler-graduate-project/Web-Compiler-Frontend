import React, { useState } from 'react';
import '../css/admin-page/AccountSettings.css';

const AccountSettings = ({ username }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!newUsername && !newEmail && !currentPassword && !newPassword) {
        setError('Please provide some data in order to change account settings.');
        return;
    }

    if (newPassword && !currentPassword) {
        setError('If you need to change password please provide current one first.');
        return;
    }

    if (newPassword && newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    const updateData = {
      currentUsername: username,
      newUsername: newUsername || null,
      newEmail: newEmail || null,
      currentPassword: currentPassword || null,
      newPassword: newPassword || null,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/admin/update-account`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        setError('Failed to update account. Please check if you provided correct password.');
        return;
      }

      setSuccessMessage('Account updated successfully! Please log in again with updated credentials to see changes.');
      setNewUsername('');
      setNewEmail('');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      setError('Network error: ' + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="account-settings-form">
        <h2>Account Settings</h2>
        <div className="form-group">
          <label htmlFor="new-username">New Username:</label>
          <input
            type="text"
            id="new-username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-email">New Email:</label>
          <input
            type="email"
            id="new-email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="current-password">Current Password:</label>
          <input
            type="password"
            id="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">New Password:</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="submit-button">Update Account</button>
      </form>
    </div>
  );
};

export default AccountSettings;
