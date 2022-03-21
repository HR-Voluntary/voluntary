import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { logout } from '../../firebase';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const ListingPage = () => {

  return (
    <div>
      LIST PAGE
    </div>
  )
};

export default ListingPage;