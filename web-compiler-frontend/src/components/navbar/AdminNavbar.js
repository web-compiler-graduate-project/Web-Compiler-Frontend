import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import '../css/admin-page/AdminNavbar.css';
import AddModerator from '../admin-page/AddModerator';
import ModeratorManagement from '../admin-page/ModeratorManagement';
import UserManagement from '../admin-page/UserManagement';
import TasksManagement from '../admin-page/TasksManagement';
import AccountSettings from '../admin-page/AccountSettings';
import LogoutButton from '../button/LogoutButton';

function AdminNavbar({ username }) {
  return (
    <>
      <div className="admin-panel-header">Admin Panel</div>
      <nav className="admin-navbar">
        <ul className="admin-navbar-list">
          <li className="admin-navbar-item">
            <Link to="add-moderator">Add Moderator</Link>
          </li>
          <li className="admin-navbar-item">
            <Link to="moderator-management">Moderator Management</Link>
          </li>
          <li className="admin-navbar-item">
            <Link to="user-management">User Management</Link>
          </li>
          <li className="admin-navbar-item">
            <Link to="tasks-management">Tasks Management</Link>
          </li>
          <li className="admin-navbar-item">
            <Link to="account-settings">Account Settings</Link>
          </li>
        </ul>
        <div className="admin-actions">
          <div className="admin-info">Logged in as: {username}</div>
          <LogoutButton />
        </div>
      </nav>

      <Routes>
        <Route path="add-moderator" element={<AddModerator />} />
        <Route path="moderator-management" element={<ModeratorManagement />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="tasks-management" element={<TasksManagement />} />
        <Route path="account-settings" element={<AccountSettings username={username} />} />
      </Routes>
    </>
  );
}

export default AdminNavbar;
