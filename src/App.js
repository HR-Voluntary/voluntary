import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import Reset from './pages/ResetPage/Reset';
import './App.css';
import ListingPage from './pages/ListingPage/ListingPage';
import ProductPage from './pages/ProductPage/ProductPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ChatPage from './pages/ChatPage/ChatPage';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/Register' element={<Register />}/>
          <Route path='/Reset' element={<Reset />}/>
          <Route path='/ListingPage' element={<ListingPage />}/>
          <Route path='/ProductPage' element={<ProductPage />}/>
          <Route path='/ProfilePage' element={<ProfilePage />}/>
          <Route path='/ChatPage' element={<ChatPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
