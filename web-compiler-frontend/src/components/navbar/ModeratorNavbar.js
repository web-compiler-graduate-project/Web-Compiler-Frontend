import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import '../css/moderator-page/ModeratorNavbar.css';
import AddTask from '../moderator-page/AddTask';
import TaskManagement from '../moderator-page/TaskManagement';
import AccountSettings from '../moderator-page/AccountSettings';

function ModeratorNavbar({ username }) {
  return ( //TODO add logut button and loading animation (to all update account components)
    <>
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
        <div className="moderator-info">Logged in as: {username}</div>
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
