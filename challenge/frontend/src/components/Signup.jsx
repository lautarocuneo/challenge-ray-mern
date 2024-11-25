
import React from 'react';
import './Signup.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import{ useState } from 'react';


const Signup = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState(""); /*si hubo error lo guardo aca, arranca siendo vacio*/
  

  const handleSubmit = (e) => { //esta funcion se ejecuta al momento del submit
    e.preventDefault(); /*evita ue refresue la pagina*/
    axios.post('http://localhost:3001/register', { email, password }) /*envia la informacion con post al puerto 3001*/
      .then(response => { /*response es la info ue me devuelve el backend despues de llegar*/
        if (response.status === 201) { /*el 201 significa que funciono todo ok y se creo un nuevo recurso, a diferencia del 200*/
          
          navigate('/login'); /*si estuvo todo ok en la response o sea el status es 201 vuelvo a la componente login con navigate de routs (no refresca paginas)*/

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
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit = {handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email" onChange = {(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange = {(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
        <div className="mt-4">
            <p>Already have an account? 
                <span className="login-link" onClick={() => navigate('/login')}> Login </span>
            </p>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/*Verifica si errorMessage tiene un valor (es decir, no es null, undefined, ni una cadena vacía).
    Si errorMessage tiene un valor verdadero, renderiza el contenido del lado derecho del operador &&.*/}
      </form>
    </div>
  );
};

export default Signup;
