var express = require('express');
var router = express.Router();
var {createUser, getAllUsers } = require('../models/user.js');


router.post('/', function(req, res){
  createUser(req.body)
  .then(success => console.log('user created! Check database.'))
  .catch(err => console.log(err))
  res.sendStatus(200).end();
});

router.get('/', function(req, res){
  getAllUsers()
  .then(success => res.status(200).send(success))
  .catch(err => {
    res.status(400).send(err);
    console.log(err);
  });
});


module.exports = router;