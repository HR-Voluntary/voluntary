var express = require('express');
var router = express.Router();
var { getUsers, getUser, thumbsUp, thumbsDown } = require('../models/user.js');

router.get('/all', function(req, res) {
  console.log('I AM WORKING');
  getUsers()
  .then(users => {
    console.log(users);
    res.status(200).send(users);
  });
});


// USER TO TEST:
// 1AOjnwnoc5bxD1u3VBiaNzKYL2k1
// INCREMENT TRUST SCORE
router.put('/trustScore/thumbsup/:id', (req, res) => {
  const { id } = req.params;
  getUser(id)
    .then((user) => {
      console.log(user);
      thumbsUp(user)
        .then(success => res.status(200).end())
        .catch(() => res.status(400).end());
    })
    .catch(() => res.status(400).end());
});
// DECREMENT TRUST SCORE
router.put('/trustScore/thumbsdown/:id', (req, res) => {
  const { id } = req.params;
  getUser(id)
    .then((user) => {
      console.log(user);
      thumbsDown(user)
        .then(success => res.status(200).end())
        .catch((err) => res.status(400).send(err));
    })
    .catch(() => res.status(400).end());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  // console.log(id);
  getUser(id)
    .then(user => res.status(200).send(user))
});



module.exports = router;