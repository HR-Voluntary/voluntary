var express = require('express');
var router = express.Router();
var { createUser, getUsers, getUser } = require('../models/user.js');


// Will not need to create user
// Done upon login:

// router.post('/', function(req, res) {
//   createUser(req.body)
//   .then(success => console.log('item created! Check database.'))
//   .catch(err => console.log(err))

//   res.sendStatus(200).end();
// });


router.get('/:id', (req, res) => {
  const { id } = req.params;
  // console.log(id);
  getUser(id)
    .then(user => res.status(200).send(user))
});

router.get('/all', function(req, res) {
  getUsers()
  .then(users => {
    console.log(users);
    res.status(200).send(users);
  });
});


module.exports = router;