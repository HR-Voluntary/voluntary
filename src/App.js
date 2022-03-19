import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import Reset from './pages/ResetPage/Reset';
import ListingPage from './pages/ListingPage/ListingPage';
import ProductPage from './pages/ProductPage/ProductPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ChatPage from './pages/ChatPage/ChatPage';
import TrustPage from './pages/TrustPage/TestPage';
import Navbar from './components/Navbar';
import styles from './App.module.css';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;

const RequireAuth = ({ user, children, redirectTo }) => {
  return user ? children :  <Navigate to={redirectTo} />
}

const RequireNoUser = ({ user, children, redirectTo}) => {
  return user ? <Navigate to={redirectTo} /> : children
}

const App = () => {

  return (
    <div className={styles.App}>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/Register' element={<Register />}
          />
          <Route path='/Reset' element={<Reset />}/>
          <Route path='/ListingPage' element={<ListingPage />}
          />
          <Route path='/ProductPage' element={<ProductPage />}
          />
          <Route path='/ProfilePage' element={<ProfilePage />}
          />
          <Route path='/ChatPage' element={<ChatPage />}
          />
          <Route path='/TrustPage' element={<TrustPage />}
          />
          <Route path='/*' element={<ListingPage />}
          />
        </Routes>
    </div>
  );
}

export default App;
