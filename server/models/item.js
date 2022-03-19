const {
  db,
  collection,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  doc,
} = require('../db.js');

const userRef = collection(db, 'item');

// USER SCHEMA & CREATION
const createItem = (userObject) => {
  return addDoc(userRef, {
    category: userObject.category,
    description: userObject.description,
    image: userObject.image,
    location: userObject.location,
    name: userObject.name,
    sellerInfo: userObject.sellerInfo,
    trustScore: userObject.trustScore
  });
};


// THE BELOW IS EXAMPLE WORK FROM IRVING:

// const getItems = () => {
//   return getDocs(userRef)
//     .then((snapshot) => {
//       const userArray = snapshot.docs.map(doc => {
//         return { id: doc.id, ...doc.data()};
//       })
//       return userArray;
//     });
// };


// const irvingRef = doc(db, 'user','irving');
// // updateDoc(irvingRef, {
// //   car:'booboo'
// // });

// get data
// getDocs(userRef)
//   .then((snapshot) => {
//     snapshot.docs.forEach(doc => console.log(doc.id))
//   });

// const addDocument = (userObject) => {
//   return addDoc(userRef, {
//     first: userObject.first,
//     last: userObject.last,
//     location: userObject.location,
//     car: userObject.car
//   })
// };

// addDocument({first: 'Irving', last: 'IIIIRIVAAANG!', location: 'Cali', car: {
//   fuel: 'gasoline',
//   gallons: 15
// }})
//   .then((success) => console.log(success));

module.exports = {
  createItem,
};