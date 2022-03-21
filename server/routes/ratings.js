var express = require('express');
var router = express.Router();
var { editTransactionCount, editRatingScore, getTrustScore } = require('../models/user.js');
require('../models/ratings/js')


router.get('/ratings/trustScore', function(req, res) {
  getTrustScore();
}

router.get('./ratings/ratingScore', function(req,res) {
  getRatingScore();
})

router.put('/ratings/transactionCount/:id', function(req, res) {
  const { id } = req.params;
  editTransactionCount(id)

});

router.put('/ratings/ratingScore/:id', function(req, res) {
  const { id } = req.params;
  editRatingScore(id)
});


// stretch goal:
// router.put('/ratings/rating');

