var express = require('express');
var router = express.Router();
const  { calculateTrustScore, editRatingsScore } = require('../models/ratings.js')
const  { getUser, updateUser } = require('../models/user.js')
const  { updateItem } = require('../models/item.js')


// {
//   transactionCount: Number,
//   trustScore: Number,
//   ratingArray: [contains all ratings],
//   ratingScore: Number
// }

// shape of pushed object:
// {
//   "rating": 5,
//   "transaction": 1,
// }

router.put('/transactionCount/:id', async (req, res) => {
  const { id } = req.params;
  const { number } = req.body;
  const user = await getUser(id);
  if (user.transactionCount === 0 && number === -1) {
    // maybe alert admins that this user should be banned.
    res.status(200).send({ message: 'User has 0 transactions and cannot be decremented.' })
    return;
  } else {
  let newCount = user.transactionCount + number;
  let transactionCount = { transactionCount: newCount}

  updateUser(id, transactionCount)
    .then(() => res.status(200).send({message: 'Increased transaction count by 1'}))
    .catch((err) => res.status(400).send({message: err.message, error: err}));
  }
});

router.put('/ratingCount/:id', async function(req, res) {
  const { id } = req.params;
  const { rating } = req.body;
  const user = await getUser(id);

  let updated;
  if (user.ratingsScore === 0) {
    updated = {
      ratingsScore: rating,
      ratingsCount: (user.ratingsCount + 1),
    };
    updated.trustScore = calculateTrustScore(user.transactionCount, updated.ratingsScore);
  } else {
    updated = {
      ratingsCount: (user.ratingsCount + 1),
    };
    updated.ratingsScore = editRatingsScore(user.ratingsScore, user.transactionCount, rating);
    updated.trustScore = calculateTrustScore(user.transactionCount, updated.ratingsScore);
  };
  updateUser(id, updated)
    .then(success => console.log(success))
    .catch(err => console.log(err))
  res.end();
});


router.put('/ratingScore/:id', function(req, res) {
  // const { id } = req.params;
  // editRatingScore(id)
});

router.get('/trustScore', function(req, res) {
  // getTrustScore();
});

router.get('/ratingScore', function(req,res) {
  // getRatingScore();
});

// stretch goal:
// router.put('/ratings/rating');

module.exports = router;