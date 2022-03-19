import React from 'react';
import "./Navbar.css";


const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>PlaceHolder</span>
      <ul className='navbar_list'>
        <li className='navbar_list_item'>
          <img src='' alt='' className='navbar_avatar' />
        </li>
        <li className='navbar_list_item'>
          John Doe
        </li>
        <li className='navbar_logout_button'>
          logout
        </li>
      </ul>
    </div>
  )
}

export default Navbar;