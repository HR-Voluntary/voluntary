var express = require('express');
var router = express.Router();
var {
  createItem,
  getItems,
  getItem,
  getItemByCategory,
  markItemSold,
  deleteItem
  } = require('../models/item.js');

// CREATE ITEM
router.post('/', function(req, res){
  console.log(req.body);
  createItem(req.body)
  .then((ifSuccess) => console.log('item created! Check database.'))
  .catch(err => console.log(err))

  res.sendStatus(200).end();
});

// GET ITEMS
router.get('/all', function(req, res){
  getItems()
  .then(items => {
    res.status(200).send(items);
  });
});

// GET ITEM BY CATEGORY
router.get('/category/:category', function(req, res){
  const { category } = req.params;
  console.log(category)
  getItemByCategory(category)
  .then(items => {
    res.status(200).send(items);
  });
});



// GET ITEM
router.get('/:id', function(req, res){
  const { id } = req.params;
  getItem(id)
  .then(items => {
    res.status(200).send(items);
  });
});

// MARK AS SOLD
router.put('/:id', function(req, res){
  const { id } = req.params;
  markItemSold(id)
  .then(items => {
    res.status(200).send(items);
  });
});

// DELETE ITEM:
router.delete('/:id', function(req, res){
  const { id } = req.params;
  deleteItem(id)
  .then(() => {
    res.status(200).end();
  })
  .catch(err => console.log(err));
});






module.exports = router;