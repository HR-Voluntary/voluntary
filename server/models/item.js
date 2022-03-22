const {
  db,
  collection,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} = require('../db.js');

const itemRef = collection(db, 'items');

// USER SCHEMA & CREATION
const createItem = (userObject) => {
  return addDoc(itemRef, {
    category: userObject.category,
    description: userObject.description,
    image: userObject.image,
    location: userObject.location,
    name: userObject.name,
    sellerInfo: userObject.sellerInfo,
    isActive: userObject.isActive
  });
};

//// SIVA DOING IT //
//Schema for items with multiple image Urls for one item

const createItemWithImgArray = (userObject) => {
  return addDoc(itemRef, {
        category: userObject.category,
        description: userObject.description,
        image: userObject.image,
        location: userObject.location,
        name: userObject.name,
        sellerInfo: userObject.sellerInfo,
        isActive: userObject.isActive
      })
};

// THE BELOW IS EXAMPLE WORK FROM IRVING:

const getItems = () => {
  return getDocs(itemRef)
    .then((snapshot) => {
      const itemArray = snapshot.docs.map(doc => {
        return {id: doc.id, ...doc.data()};
      })
      return itemArray;
    });
};

const getItem = (id) => {
  console.log('in getItem')
  console.log(id)
  return getDocs(itemRef)
    .then((snapshot) => {
      const doc = snapshot.docs.filter(doc => id === doc.id)
      return {...doc[0].data()};
    })
    .catch((err) => {
      return {  error: err, message: 'item not found!' }
    });
};
// GET items by category name
const getItemByCategory = (category) => {
  // console.log('in CATEGORY FUNC')
  // console.log(category)
  return getDocs(itemRef)
    .then((snapshot) => {
      const docs = snapshot.docs.filter(doc => category === doc.data().category)
      let itemsByCategoryArray = [];
      docs.forEach(doc => {
        itemsByCategoryArray.push({...doc.data()})
      });
      console.log(itemsByCategoryArray)
      return itemsByCategoryArray
    });
  };

  const  UpdateItem = (id, itemObject) => {
    return updateDoc(doc(db,'items',id),itemObject);
    //return setDoc(doc(db,'users',userObject.uid),obj);
  };
const markItemSold = (id) => {
  const docToUpdate = doc(db, 'items', id);
  return updateDoc(docToUpdate, { isActive: false })
    .then((success) => {
      return success;
    });
};

const deleteItem = (id) => {
  const docToDelete = doc(db, 'items', id);
  return deleteDoc(docToDelete);
}



//                      db  collection uid
// const irvingRef = doc(db, 'user','irving');
// updateDoc(irvingRef, {
//   car:'booboo'
// });

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
  getItemByCategory,
  createItem,
  getItems,
  getItem,
  markItemSold,
  deleteItem,
  createItemWithImgArray,
  UpdateItem
};