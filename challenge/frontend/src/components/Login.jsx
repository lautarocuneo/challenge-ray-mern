import React from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import{ useState } from 'react';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', {email, password})
    .then(result => {
        console.log(result);
        if(result.status === 200) { /*el 201 significa que funciono todo ok pero no se creo ningun recurso nuevo, a diferencia del 201*/

          const token = result.data.token;
          localStorage.setItem('token', token);
          navigate('/home');

        }
    })
    .catch(error => {
      if (error.response) {
        
        const errorMsg = error.response.data.message;
        setErrorMessage(`Error: ${errorMsg}`);
      } else {
        
        setErrorMessage('Error connecting to the server');
      }
    });
  }


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit = {handleSubmit}> 
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email" onChange = {(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange = {(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <div className="mt-4">
            <p>Don´t have an account?
                <span className="login-link" onClick={() => navigate('/register')}> Sign up </span>
            </p>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
         {/*Verifica si errorMessage tiene un valor (es decir, no es null, undefined, ni una cadena vacía).
    Si errorMessage tiene un valor verdadero, renderiza el contenido del lado derecho del operador &&.*/}
      </form>
    </div>
  );
};

export default Login;
