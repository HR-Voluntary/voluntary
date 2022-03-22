import React, { useState, useEffect } from 'react';
import icons from './icons.js';
import styles from './Thumbs.module.css';

const { emptyStar, filledStar } = icons;

const Stars = () => {
  const [rating, setRating] = useState([false, false, false, false, false]);
  const [finalRating, setFinalRating] = useState(null);

  function hoverFillStars(e) {
    let fillTo = parseInt(e.target.id);
    let copyRating = [...rating];
    for (let i = 0; i <= fillTo; i++) {
      console.log('old value 1', copyRating);
      copyRating[i] = !copyRating[i];
    }
    setRating(copyRating);
  }

  function emptyStars() {
    setRating([false, false, false, false, false]);
  }

  function handleClick(e) {
    e.preventDefault();
    let selectedRating = [...rating];
    setFinalRating(selectedRating);
  }

  useEffect(() => console.log('re-render', rating), [rating]);

  return (
    <div>
      <p>How was the transaction?</p>
      <div className={styles.allStars}>
        {(finalRating || rating).map((star, index) =>
          <div
            id={index}
            key={`star-${index}`}
            className={styles.star}
            onMouseEnter={hoverFillStars}
            onMouseLeave={emptyStars}
            onClick={handleClick}
          >
            {star ? filledStar : emptyStar}
          </div>)}
      </div>
    </div>
  );
};

export default Stars;