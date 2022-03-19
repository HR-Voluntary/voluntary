const { getModularInstance } = require('@firebase/util');
const {
  db,
  collection,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  doc,
} = require('../db.js');

const userRef = collection(db, 'users');

// USER SCHEMA & CREATION
// const createUser = (userObject) => {
//   return addDoc(userRef, {
//     first: userObject.first,
//     last: userObject.last,
//     location: userObject.location
//   })
// };

// TEST:
// setDoc(doc(db, "user", "jimmy"), {
//   name: "San Francisco",
//   state: "CA",
//   country: "USA"
// });


const getUsers = () => {
  return getDocs(userRef)
    .then((snapshot) => {
      const userArray = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data()};
      })
      return userArray;
    });
};

const getUser = (id) => {
  // console.log(id);
  return getDocs(userRef)
    .then((snapshot) => {
      const doc = snapshot.docs.filter(doc => doc.id === id);
      console.log(doc)
      return {...doc[0].data()};
    })
}

module.exports = {
  // createUser,
  getUsers,
  getUser
}