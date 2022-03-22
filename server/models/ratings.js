const { getModularInstance } = require('@firebase/util');
const {
  db,
  collection,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  doc,
} = require('../db.js');

//const userRef = collection(db, 'users');

// transactionCount, trustScore, ratingsScore, ratingsCount
// user.ratings = {
//   transactionCount:
//   trustScore:
//   ratingsScore:
//   ratingsCount:
// }

// const editTransactionCount = (point) => {
//   if (point < 0 && user.ratings.transactionCount === 0) {
//     //do nothing
//   } else {
//     // change transaction total in db
//     //user.ratings.transactionCount++
//   }
//   editTrustScore();
//   return;
// }

// const editTrustScore = () => {
//   calculateTrustScore();
//   //put new Trust score in db
//   return;
// }

// grab their current transactionCount and ratingsScore
const calculateTrustScore = (transactionCount, ratingsScore) => {
  let trustScore;
  if (transactionCount < 5) {
    trustScore = 1;
  };
  if (transactionCount >= 5 && transactionCount < 15) {
    trustScore = 2;
  };
  if (transactionCount >= 15 && transactionCount < 30) {
    if (ratingsScore >= 3.5) {
      trustScore = 3;
    } else {
      trustScore = 2;
    }
  }
  if (transactionCount >= 30) {
    if (ratingsScore >= 4) {
      trustScore = 4; //aka "Trusted Seller"
    } else {
      trustScore = 3;
    }
  }
  return trustScore;
}

const getTrustScore = () => {
  // get user.ratings.trustScore
  return;
}



const editRatingsScore = (currRatingScore, currCount, newRating) => {
  // CALCULATE new average formula = ((oldAverageRating * counter) + newrating) / counter++)

  const newAvg = ((currRatingScore * currCount) + newRating) / (currCount + 1);

  // SPECIFIC TO USE:
  // ((user.ratings.ratingsScore * user.ratings.ratingsCount) + newRating) / (user.ratings.ratingsCount + 1)

  // user.ratings.ratingsCount = user.ratings.ratingsCount +1
  // update ratingsScore
  return newAvg;
}

const getRatingsScore = () => {
  //get current average score
  return;
}

module.exports = {
  calculateTrustScore,
  getTrustScore,
  editRatingsScore,
  getRatingsScore,
};
