import React, {useState, useEffect} from 'react';
import Thumbs from './Thumbs.js';
import Stars from './Stars.js';

const ratingsStyling = {
  position: 'absolute',
  bottom: '12.5%',
  zIndex: 2,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  backgroundColor: '#FEDCC5',
  borderRadius: '20px'
}

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

  return <div style={ratingsStyling}>{!thumbSelected ? showThumbs() : showStars()}</div>
};

export default AllRatings;