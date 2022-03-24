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
      uid={props.uid}
      type={props.type}
      />
    );
  }

  function showStars() {
    return (
      <Stars
      onClick1={props.onClick}
      uid={props.uid}
      type={props.type}
      />
    );
  }

  return <div>{!thumbSelected ? showThumbs() : showStars()}</div>
};

export default AllRatings;