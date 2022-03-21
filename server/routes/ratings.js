var express = require('express');
var router = express.Router();
const  { getTrustScore, getRatingScore, editTransactionCount, editRatingScore } = require('../models/ratings.js')
const  { getUser } = require('../models/user.js')


<<<<<<< HEAD
router.get('/ratings/trustScore', function(req, res) {
  getTrustScore();
})
=======
// {
//   transactionCount: Number,
//   trustScore: Number,
//   ratingArray: [contains all ratings],
//   ratingScore: Number
// }
>>>>>>> main

router.put('/transactionCount/:id', async function(req, res) {
  const { id } = req.params;
  console.log(id);
  const user = await getUser(id);
  console.log(user);
  const {  } = req.body;

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