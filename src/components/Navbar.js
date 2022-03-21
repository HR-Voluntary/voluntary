import React from 'react';
import styles from './Navbar.module.css';
import { useLocation } from 'react-router';
import { logout } from '../firebase';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {

  const { user } = useAuth();
  const location = useLocation();

  if (location.pathname === '/' || location.pathname === '/Register' || location.pathname === '/Reset') {
    return null
  }

  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>
        <Link className={styles.logo} to='/ListPage'>
          PlaceHolder
        </Link>
      </span>
      <ul className={styles.navbar_list}>
        <li className={styles.navbar_list_item}>
          <Link className={styles.link} to='/ProfilePage'>
            <img src={user?.photoURL} alt='' className={styles.navbar_avatar} />
          </Link>
        </li>
        <li className={styles.navbar_list_item}>
          <Link className={styles.link} to='/ProfilePage'>{user?.displayName}</Link>
        </li>
        <li>
          <button className={styles.navbar_logout_button} onClick={ logout }><span>Logout</span></button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;