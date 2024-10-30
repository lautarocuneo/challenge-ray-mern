import React from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <div className="mt-4">
            <p>Don´t have an account?
                <span className="login-link" onClick={() => navigate('/register')}> Sign up </span>
            </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
