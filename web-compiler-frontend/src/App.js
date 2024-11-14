import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Compile from './components/compile/Compile';
import RegisterPage from './components/register/RegisterPage';
import AdminNavbar from './components/navbar/AdminNavbar';
import ModeratorNavbar from './components/navbar/ModeratorNavbar';
import UserNavbar from './components/navbar/UserNavbar';
import { Helmet } from 'react-helmet';
import useCurrentUser from './hooks/useCurrentUser';

const ROLE_ADMIN = "ROLE_ADMIN";
const ROLE_MODERATOR = "ROLE_MODERATOR";
const ROLE_USER = "ROLE_USER";

function App() {
  const { user, role } = useCurrentUser();

  useEffect(() => {
    if (user) {
      let redirectPath = '';

      switch (role) {
        case ROLE_ADMIN:
          redirectPath = '/admin/add-moderator';
          break;
        case ROLE_MODERATOR:
          redirectPath = '/moderator/add-task';
          break;
        case ROLE_USER:
          redirectPath = '/user/compile';
          break;
        default:
          break;
      }

      if (window.location.pathname !== redirectPath) {
        window.location.href = redirectPath;
      }
    }
  }, [user, role]);

  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>Web Compiler</title>
          <link rel="icon" href="/favicon.ico" />
        </Helmet>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/" element={<Compile />} />
          <Route
            path="/admin/*"
            element={user && role === ROLE_ADMIN ? <AdminNavbar username={user} /> : <div>You do not have access to this page.</div>}
          />
          <Route
            path="/moderator/*"
            element={user && role === ROLE_MODERATOR ? <ModeratorNavbar username={user} /> : <div>You do not have access to this page.</div>}
          />
          <Route
            path="/user/*"
            element={user && role === ROLE_USER ? <UserNavbar username={user} /> : <div>You do not have access to this page.</div>}
          />
        </Routes>
        <footer className="footer">
          @Copyright Michał Wieczorek
        </footer>
      </div>
    </Router>
  );
}

export default App;
