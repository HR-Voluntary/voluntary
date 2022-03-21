import React from 'react';
import styles from './Navbar.module.css';
import { useLocation } from 'react-router';
import { logout } from '../firebase';

const Navbar = () => {

  const location = useLocation();

  if (location.pathname === '/' || location.pathname === '/Register' || location.pathname === '/Reset') {
    return null
  }

  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>PlaceHolder</span>
      <ul className={styles.navbar_list}>
        <li className={styles.navbar_list_item}>
          <img src='' alt='' className={styles.navbar_avatar} />
        </li>
        <li className={styles.navbar_list_item}>
          John Doe
        </li>
        <li className={styles.navbar_logout_button}>
          <button onClick={ logout }>Logout</button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;