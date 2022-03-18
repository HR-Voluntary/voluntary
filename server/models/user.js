// USER SCHEMA
const { User } = require('../schemas/user.js');

const createUser = (userObject) => {
  return User.create(userObject);
};

const getAllUsers = () => {
  return User.find({});
};

module.exports = {
  createUser,
  getAllUsers
};