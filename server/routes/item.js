var express = require('express');
var router = express.Router();
var {
  createItem,
  editItem,
  createItemWithImgArray,
  getItems,
  getItem,
  getItemByCategory,
  markItemSold,
  deleteItem,
  UpdateItem
  } = require('../models/item.js');

// CREATE ITEM
router.post('/', function(req, res) {
  const { itemToPost } = req.body;
  itemToPost.isActive = true;

  console.log(itemToPost);

  createItem(itemToPost)
  .then((ifSuccess) => res.status(200).send({ message: 'Successfully posted item', }))
  .catch(err =>  res.sendStatus(400).end({message: 'There was an error', errorObject: err}));
});

//// SIVA DOING IT //
//Post route for array of image Urls
router.post('/img', function(req, res){
  console.log(req.body);
  createItemWithImgArray(req.body)
  .then((ifSuccess) => res.sendStatus(200).end())
  .catch(err => console.log(err))

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
  //console.log('ID = ', id);
  getItem(id)
  .then(items => {
    res.status(200).send(items);
  });
});


// Edit ITEM // SIVA
router.put('/itm/:id', function(req, res){
  const { id } = req.params;
  console.log('EDITING ITEM')
  console.log(id)
  UpdateItem(id, req.body)
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