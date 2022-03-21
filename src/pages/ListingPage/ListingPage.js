import React, { useEffect } from 'react';
import { logout } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router';

const ListingPage = () => {

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
  }, [user, loading]);

  return (
    <div>
      <button onClick={logout}>LOG OUT</button>
    </div>
  )
};

export default ListingPage;