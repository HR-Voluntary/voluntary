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

const editTransactionCount = (point) => {
  if (point < 0 && user.ratings.transactionCount === 0) {
    //do nothing
  } else {
    // change transaction total in db
    //user.ratings.transactionCount++
  }
  editTrustScore();
}

const editTrustScore = () => {
  calculateTrustScore();
  //put new Trust score in db
}

const calculateTrustScore = () => {
  // grab their current transactionCount and ratingsScore
  // if (transactionCount < 5) {
  //   trustScore = 1;
  // }

  // if (transactionCount >= 5 && transactionCount < 15) {
  //   trustScore = 2;
  // }

  // if (transactionCount >= 15 && totalTransaction < 30) {
  //   if (ratingsScore >= 3.5) {
  //     trustScore = 3;
  //   } else {
  //     trustScore = 2;
  //   }
  // }

  // if (transactionCount >= 30) {
  //   if (ratingsScore >= 4) {
  //     trustScore = 4; //aka "Trusted Seller"
  //   } else {
  //     trustScore = 3;
  //   }
  // }

}

const getTrustScore = () => {
  // get user.ratings.trustScore
}



const editRatingsScore = (newRating) => {
  // CALCULATE new average formula = ((oldAverageRating * counter) + newrating) / counter++)
  // ((user.ratings.ratingsScore * user.ratings.ratingsCount) + newRating) / (user.ratings.ratingsCount + 1)
  // user.ratings.ratingsCount = user.ratings.ratingsCount +1
  // update ratingsScore
}

const getRatingsScore = () => {
  //get current average score
}