import React, { useEffect } from 'react';
import { logout } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

const ListingPage = () => {

  return (
    <div>
      <button onClick={ logout }>LOG OUT</button>
    </div>
  )
};

export default ListingPage;