// USER SCHEMA
const { Item } = require('../schemas/item.js');

const createItem = (itemObject) => {
  return Item.create(itemObject);
};

const getAllItems = () => {
  return Item.find({});
};

module.exports = {
  createItem,
  getAllItems
};