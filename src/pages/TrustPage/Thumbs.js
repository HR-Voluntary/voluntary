import React, { useState, useEffect } from 'react';
import icons from './icons.js';
import styles from './Thumbs.module.css';
import axios from 'axios';
import {useAuth} from '../../contexts/AuthContext.js'
const { thumbsUpWhite, thumbsDownWhite, thumbsDownFill, thumbsUpFill } = icons;

const Thumbs = (props) => {
  const [hoverUp, setHoverUp] = useState(false);
  const [hoverDown, setHoverDown] = useState(false);
  const [selectUp, setSelectUp] = useState(false);
  const [selectDown, setSelectDown] = useState(false);
  const [selectedThumb, setSelectedThumb] = useState(null);
  // const { setHasRated } = useAuth();

  function whichThumbsText(user) {
    if (user === 'buyer') {
      return 'Did you receive your transaction?'
    }

    if (user === 'seller') {
      return 'Did you complete your transaction?'
    }
  }

  function hoverFillThumb(e) {
    if (e.target.id === '1') {
      setHoverUp(true);
    } else if (e.target.id === '-1') {
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
    console.log('thumb CLICKED');
    // setHasRated(true);
    e.preventDefault();
    if (e.currentTarget.id === '1') {
      setSelectUp(true);
    } else if (e.currentTarget.id === '-1') {
      setSelectDown(true);
    }
    console.log('this is the props ~~~~',props)
    axios.put(`http://localhost:3001/ratings/transactionCount/${props.uid}`, {
      data: { number: parseInt(e.currentTarget.id) }
    })
    .then(console.log('added to db!'))
    .catch(console.log('error thumbs'))

    props.onClick(e);
  }


  useEffect(() => console.log('hi'), [selectUp, selectDown]);

  return (
    <div className={styles.popup}>
      <p>{whichThumbsText(props.type)}</p>
      <div className={styles.bothThumbs}>
        <div
          id='1'
          className={styles.thumbsUp}
          onMouseEnter={(e) => hoverFillThumb(e)}
          onMouseLeave={(e) => unfillThumb(e)}
          onClick={(e) => handleClick(e)}>
          {hoverUp || selectUp ? thumbsUpFill : thumbsUpWhite}
        </div>

        <div
          id='-1'
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