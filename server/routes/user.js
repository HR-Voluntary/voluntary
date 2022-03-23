var express = require('express');
var router = express.Router();
var { getUsers,
   getUser,
   thumbsUp,
   thumbsDown,
   getUsersAndProducts,
   getItemsForUser,
   getTrustScore,
   updateUser,
  } = require('../models/user.js');

  router.put('/editUsr/:id', function(req, res){
   // console.log(req.body);
   const { id } = req.params;
    updateUser(id, req.body)
    .then((ifSuccess) => console.log('User added Siva! Check database.'))
    .catch(err => console.log(err))
    res.sendStatus(200).end();
  });

router.get('/all', function(req, res) {
  console.log('I AM WORKING');
  getUsersAndProducts()
  .then(users => {
    // console.log(users);
    res.status(200).send(users);
  });
});

/// SIVA did that
// Get request for all the items listed by a user
// Route /user/profile/:id
router.get('/profile/:id', function(req, res) {
  const { id } = req.params;
  //console.log('I AM WORKING SIVAAA');
  getItemsForUser(id)
  .then(users => {
   // console.log(users);
    res.status(200).send(users);
  })
  .catch(() => res.status(400).end());
});
// USER TO TEST:
// 1AOjnwnoc5bxD1u3VBiaNzKYL2k1

//GET trust score SIVAAAA
router.get('/trustScore/:id', function(req, res) {
  const { id } = req.params;
  getTrustScore(id)
  .then(score => {
    res.status(200).send(score);
  })
  .catch(() => res.status(400).end());
});
// INCREMENT TRUST SCORE for thumbsUp
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
// user info
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // console.log(id);
  getUser(id)
    .then(user => res.status(200).send(user))
});



module.exports = router;