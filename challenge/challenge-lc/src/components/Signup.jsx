import React from 'react';
import './Signup.scss';

const Signup = () => {
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
        <div className="mt-4">
            <p>Already have an account? 
                <span className="login-link" onClick={() => navigate('/login')}> Login </span>
            </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
