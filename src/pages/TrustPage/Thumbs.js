import React, { useState, useEffect } from 'react';
import icons from './icons.js';
import styles from './Thumbs.module.css';

const { thumbsUpWhite, thumbsDownWhite, thumbsDownFill, thumbsUpFill } = icons;

const Thumbs = (props) => {
  const [hoverUp, setHoverUp] = useState(false);
  const [hoverDown, setHoverDown] = useState(false)
  const [selectUp, setSelectUp] = useState(false);
  const [selectDown, setSelectDown] = useState(false);
  const [selectedThumb, setSelectedThumb] = useState(null);

  function hoverFillThumb(e) {
    if (e.target.id === 'thumbsUp') {
      setHoverUp(true);
    } else if (e.target.id === 'thumbsDown') {
      setHoverDown(true);
    }
  }

  function unfillThumb(e) {
    if (selectUp || hoverUp) {
      setHoverUp(false);
    } else {
      setHoverDown(false);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    if (e.currentTarget.id === 'thumbsUp') {
      setSelectUp(true);
    } else if (e.currentTarget.id === 'thumbsDown') {
      setSelectDown(true);
    }
    //axios post request to database to add/minus transaction
    props.onClick();
  }


  //Text should say: "Did you receive transaction" for buyer
  //Text should say: "Did you coomplete transaction" for seller
  useEffect(() => console.log('hi'), [selectUp, selectDown]);

  return (
    <div>
      <p>Did you receive transaction?</p>
      <div className={styles.bothThumbs}>
        <div
          id={'thumbsUp'}
          className={styles.thumbsUp}
          onMouseEnter={(e) => hoverFillThumb(e)}
          onMouseLeave={(e) => unfillThumb(e)}
          onClick={(e) => handleClick(e)}>
          {hoverUp || selectUp ? thumbsUpFill : thumbsUpWhite}
        </div>

        <div
          id={'thumbsDown'}
          className={styles.thumbsDown}
          onMouseEnter={(e) => hoverFillThumb(e)}
          onMouseLeave={(e) => unfillThumb(e)}
          onClick={(e) => handleClick(e)}>
          {hoverDown || selectDown ? thumbsDownFill : thumbsDownWhite}
        </div>

      </div>
    </div>
  );
};

export default Thumbs;