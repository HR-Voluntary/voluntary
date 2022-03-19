import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import {
  auth,
  registerWithEmailAndPassword,
} from "../../firebase";
import styles from './Register.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const [type, setType] = useState('Individual');
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password, type);
  };
  useEffect(() => {
    if (loading) return; // maybe trigger loading screen

    if (user) {
      navigate('/ListingPage')
    }
  }, [user, loading]) // LOOK AT THIS IF SHIT BREAKS

  return (
    <div className={styles.register}>
      <div className={styles.register__container}>
        <div className={styles.register__features}>
          <h5>Your Logo</h5>
          <h1>Sign Up</h1>
          <div className={styles.register_passwordContainer}>
            <div>Name</div>
            <input
              type='text'
              className={styles.register__passwordInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
            >
            </input>
          </div>
          <div className={styles.register_passwordContainer}>
            <div>Email</div>
            <input
              type='text'
              className={styles.register__passwordInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
            >
            </input>
          </div>
          <div className={styles.register_passwordContainer}>
            <div>Password</div>
            <input
              type='password'
              className={styles.register__passwordInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            >
            </input>
          </div>
          <div>
            <div className={styles.dropdown_text}>Account Type</div>
            <div className={styles.register__authBtns}>
              <select value={type} onChange={(e) => setType(e.target.value)} className={styles.dropdown}>
                <option value='Individual'>Individual</option>
                <option value='Organization'>Organization</option>
              </select>
            </div>
          </div>
          <button
            className={styles.register__btn}
            onClick={register} // add functionality
          >
            Sign Up
          </button>
        </div>
      </div>
      <img src={require('./utils/Mascot.png')}></img>
    </div>
  );
}

export default Register;