import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './UserLogin.css';
import axios from 'axios';

const UserLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit =  (e) => {
    e.preventDefault();
     axios.post('http://localhost:3001/login', {username, password })
     .then(result => {
        console.log(result)
           if(result.data === "Success") {
              onLogin();
              navigate("/department");
      }
      // navigate("/department");
      // if (response.status === 200) {
      //   onLogin(); 
      //   navigate("/department"); 
      // }
     })
     .catch(err => console.log(err)) 
  }

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 form-blur" style={{ maxWidth: '400px', width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">Login</h1>
          <div className="mb-3 position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
          </div>
          <div className="mb-3 position-relative">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="text-decoration-none">Forget Password?</a>
          </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
