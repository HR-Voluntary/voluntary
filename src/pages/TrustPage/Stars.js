import React, { useState, useEffect } from 'react';
import icons from './icons.js';
import styles from './Thumbs.module.css';
import axios from 'axios';

const { emptyStar, filledStar } = icons;

const Stars = (props) => {
  const [rating, setRating] = useState([false, false, false, false, false]);
  const [finalRating, setFinalRating] = useState(null);

  function whichStarsText(user) {
    if (user === 'buyer') {
      return 'Please rate seller'
    }

    if (user === 'seller') {
      return 'Please rate other party'
    }
  }

  function hoverFillStars(e) {
    let fillTo = parseInt(e.target.id);
    let copyRating = [...rating];
    for (let i = 0; i <= fillTo; i++) {
<<<<<<< HEAD
      // console.log('old value 1', copyRating);
=======
>>>>>>> 19eee45 (Fully functional and correctly puts data to db)
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
    let finalStars = selectedRating.filter(rating => rating);
    let sendRating = finalStars.length;

    axios.put(`http://localhost:3001/ratings/ratingCount/${props.userInfo.uid}`, {
      data: { rating: sendRating }
    })
    .then(console.log('added rating to db!'))
    .catch(console.log('error rating'))

    props.onClick1();
  }

  useEffect(() => {}, [rating]);

  return (
    <div className={styles.popup}>
      <p>{whichStarsText(props.userInfo.type)}</p>
      <div className={styles.allStars}>
        {(finalRating || rating).map((star, index) =>
          <div
            id={index}
            key={`star-${index}`}
            className={styles.star}
            onMouseOver={hoverFillStars}
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