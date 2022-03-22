import React, {useState, useEffect} from 'react';
import Thumbs from './Thumbs.js';
import Stars from './Stars.js';

const TrustPage = () => {
  const [thumbSelected, setThumbSelected] = useState(false);

  function selectThumb() {
    setThumbSelected(true);
  }

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

  return <div onClick={selectThumb}>{!thumbSelected ? showThumbs() : showStars()}</div>
};

export default TrustPage;