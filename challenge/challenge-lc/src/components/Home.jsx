import React from 'react';
import './Home.scss';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/login');
    }

    return (
    <div>
        <h2>
             WELCOME
        </h2>
        <h6 className='back-to-log' onClick={() => goBack()}>
            Back to login
        </h6>
    </div>
      
      
    
      
    );
  };


  export default Home;