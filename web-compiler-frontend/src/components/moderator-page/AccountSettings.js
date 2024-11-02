import React from 'react';

function AccountSettings() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logika aktualizacji ustawień konta
    console.log('Account settings updated!');
  };

  return (
    <div>
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <button type="submit">Update Settings</button>
      </form>
    </div>
  );
}

export default AccountSettings;
