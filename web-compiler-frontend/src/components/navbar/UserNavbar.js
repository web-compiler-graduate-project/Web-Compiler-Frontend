import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import '../css/user-page/UserNavbar.css';
import Compile from '../compile/Compile';
import CompileHistory from '../user-page/CompileHistory';
import Tasks from '../user-page/Tasks';
import TasksHistory from '../user-page/TasksHistory';
import AccountSettings from '../user-page/AccountSettings';

function UserNavbar({ username }) {
  return (
    <>
      <nav className="user-navbar">
        <ul className="user-navbar-list">
          <li className="user-navbar-item">
            <Link to="compile">Compile</Link>
          </li>
          <li className="user-navbar-item">
            <Link to="compile-history">Compile History</Link>
          </li>
          <li className="user-navbar-item">
            <Link to="tasks">Tasks</Link>
          </li>
          <li className="user-navbar-item">
            <Link to="tasks-history">Tasks History</Link>
          </li>
          <li className="user-navbar-item">
            <Link to="account-settings">Account Settings</Link>
          </li>
        </ul>
        <div className="user-info">Logged in as: {username}</div>
      </nav>

      <Routes>
        <Route path="compile" element={<Compile />} />
        <Route path="compile-history" element={<CompileHistory />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="tasks-history" element={<TasksHistory />} />
        <Route path="account-settings" element={<AccountSettings username={username} />} />
      </Routes>
    </>
  );
}

export default UserNavbar;
