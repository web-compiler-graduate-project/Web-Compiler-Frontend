import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import '../css/moderator-page/ModeratorNavbar.css';
import AddTask from '../moderator-page/AddTask';
import TaskManagement from '../moderator-page/TaskManagement';
import AccountSettings from '../moderator-page/AccountSettings';
import LogoutButton from '../button/LogoutButton';

function ModeratorNavbar({ username }) {
  return ( //TODO add logut button and loading animation (to all update account components)
    <>
      <div className="moderator-panel-header">Moderator Panel</div>
      <nav className="moderator-navbar">
        <ul className="moderator-navbar-list">
          <li className="moderator-navbar-item">
            <Link to="add-task">Add Task</Link>
          </li>
          <li className="moderator-navbar-item">
            <Link to="task-management">Task Management</Link>
          </li>
          <li className="moderator-navbar-item">
            <Link to="account-settings">Account Settings</Link>
          </li>
        </ul>
        <div className="admin-actions">
          <div className="moderator-info">Logged in as: {username}</div>
          <LogoutButton />
        </div>
      </nav>

      <Routes>
        <Route path="add-task" element={<AddTask />} />
        <Route path="task-management" element={<TaskManagement />} />
        <Route path="account-settings" element={<AccountSettings username={username}/>} />
      </Routes>
    </>
  );
}

export default ModeratorNavbar;
