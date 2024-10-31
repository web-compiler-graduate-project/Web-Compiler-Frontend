import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Compile from './components/compile/Compile';
import RegisterPage from './components/register/RegisterPage';
import UserNavbar from './components/navbar/UserNavbar';
import { Helmet } from 'react-helmet';
import useCurrentUser from './hooks/useCurrentUser';

const ROLE_USER = "ROLE_USER";

function App() {
  const { user, role } = useCurrentUser();

  return ( //TODO finish
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
            path="/user/*"
            element={
              user && role === ROLE_USER ? (
                <UserNavbar username={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
