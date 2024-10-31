
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/signup'
import Login from './components/Login'
import Home from './components/Home'
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  </BrowserRouter>
  
  )
}

export default App
