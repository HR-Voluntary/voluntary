import React, {useState, useEffect} from 'react';
import Thumbs from './Thumbs.js';
import Stars from './Stars.js';

const AllRatings = (props) => {
  const [thumbSelected, setThumbSelected] = useState(false);

  function selectThumb(e) {
    e.preventDefault();
    setThumbSelected(true);
  }

  function showThumbs() {
    return (
      <Thumbs
      onClick={(e) => selectThumb(e)}
      userInfo={props.userInfo}
      />
    );
  }

  function showStars() {
    return (
      <Stars
      onClick1={props.onClick}
      userInfo={props.userInfo}
      />
    );
  }

  return <div>{!thumbSelected ? showThumbs() : showStars()}</div>
};

export default AllRatings;