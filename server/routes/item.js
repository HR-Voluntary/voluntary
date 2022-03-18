var express = require('express');
var router = express.Router();
var {createItem, getAllItems } = require('../models/item.js');


router.post('/', function(req, res){
  createItem(req.body)
  .then(success => console.log('item created! Check database.'))
  .catch(err => console.log(err))
  res.sendStatus(200).end();
});

router.get('/', function(req, res){
  res.send('GET ITEM ROUTE.');
});


module.exports = router;