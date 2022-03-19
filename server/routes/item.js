var express = require('express');
var router = express.Router();
var { createItem } = require('../models/item.js');


router.post('/', function(req, res){
  console.log('RIGHT ROUTE')
  createItem(req.body)
  .then((ifSuccess) => console.log('item created! Check database.'))
  .catch(err => console.log(err))

  res.sendStatus(200).end();
});



// router.get('/', function(req, res){
//   getUsers()
//   .then(users => {
//     res.status(200).send(users);
//   });
// });


module.exports = router;