import React from 'react';
import { logout } from '../../firebase';

const ProductPage = () => {

  return <div>
    <button onClick={() => logout()}>logout</button>
  </div>
};

export default ProductPage;