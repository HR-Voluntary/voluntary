import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useLocation } from 'react-router';
import { logout } from '../firebase';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {

  const { currentUser, currentUserData } = useAuth();
  const location = useLocation();
  const [currentImage, setCurrentImage] = useState(require('./utils/Mascot.png'));

  useEffect(() => {
    if (currentUserData?.photo) {
      setCurrentImage(currentUserData?.photo)
    }
  }, []);

  if (location.pathname === '/' || location.pathname === '/Register' || location.pathname === '/Reset') {
    return null
  }

  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>
        <Link className={styles.logo} to='/ListPage'>
          <img className={styles.image} src={require('./utils/Mascot.png')} alt=''></img>
          <span className={styles.logoText}>Voluntary</span>
        </Link>
      </span>
      <ul className={styles.navbar_list}>
        <li className={styles.navbar_list_item}>
          <Link className={styles.link} to='/ProfilePage'>
            <img src={currentImage} alt='' className={styles.navbar_avatar} />
          </Link>
        </li>
        <li className={styles.navbar_list_item}>
          <Link className={styles.link} to='/ProfilePage'>{currentUserData?.name}</Link>
        </li>
        <li>
          <button className={styles.navbar_logout_button} onClick={ logout }><span>Logout</span></button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;