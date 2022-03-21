import React, {useState, useEffect} from 'react';
import Thumbs from './Thumbs.js';
import Stars from './Stars.js';

const TrustPage = () => {
  const [thumbSelected, setThumbSelected] = useState(false);

  function showThumbs() {
    return (
      <Thumbs />
    );
  }

  function showStars() {
    return (
      <Stars />
    );
  }

  return <div>{!thumbSelected ? showThumbs() : showStars()}</div>
};

export default TrustPage;