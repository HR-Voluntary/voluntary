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
const itemRef = collection(db, 'items');

const getUsers = () => {
  console.log('I am firing')
  return getDocs(userRef)
    .then((snapshot) => {
      const userArray = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data()};
      })
      return userArray;
    });
};

const getUsersAndProducts = async () => {
  const itemArray = await getDocs(itemRef)
    .then((snapshot) => {
      const itemArray = snapshot.docs.map(doc => {
        return {id: doc.id, ...doc.data()};
      });
      return itemArray;
    })

  const userArray = await getDocs(userRef)
    .then((snapshot) => {
      const userArray = snapshot.docs.map(doc => {
        const userSpecificItemArray = itemArray.filter(item => {
          return item.sellerInfo === doc.data().uid
        })
        return { id: doc.id, ...doc.data(), userItems: userSpecificItemArray};
      })
      return userArray;
    });

  return userArray;
};

//getUsersAndProducts();

//  Get all the items listed by a user with a given UserId
const getItemsForUser = async (id) => {
  //itemArray holds all the items
  const itemArray = await getDocs(itemRef)
    .then((snapshot) => {
      const itemArray = snapshot.docs.map(doc => {
        return {id: doc.id, ...doc.data()};
      });
      return itemArray;
    })

   // console.log("itemArray = ", itemArray);

  const userArray = await getDocs(userRef)
    .then((snapshot) => {
      const userArray = snapshot.docs.map(doc => {
        const userSpecificItemArray = itemArray.filter(item => {
          //filter from itemArray the item matches with uid(from users) and the sellerInfo to userSpecificItemArray
          return item.sellerInfo === doc.data().uid
        })
        // userSpecificItemArray => an array holds all the items listed by a user and returned under key "userItems"
        return { id: doc.id, ...doc.data(), userItems: userSpecificItemArray};
      })
      //userArray is the array of objects with id, data(which holds the uid), userItems(holds the userSpecificItems)
      return userArray;
    });
    //console.log("userArray = ", userArray);
    //Filter through the userArray return the items that matches the given id with the item.uid=> is the sellerInfo or the seller/user Id
    return userArray.filter(item => {
      return item.uid === id;
    })
  };

const getUser = (id) => {
  return getDocs(userRef)
    .then((snapshot) => {
      const doc = snapshot.docs.filter(doc => doc.id === id);
      return {...doc[0].data()};
    });
}
//Get trustscore BY SIVA
const getTrustScore = (id) => {
  return getDocs(userRef)
    .then((snapshot) => {
      const doc = snapshot.docs.filter(doc => doc.id === id);
      return {trustScore: doc[0].data().trustScore };
    });
}
const thumbsUp = (user) => {
  if (user.trustScore === 100) {
    return new Error({message: 'User is at 100 and cannot be incremented'})
  } else {
    const updatedTrustScore = user.trustScore + 1;
    const userToUpdate = doc(db, 'users', user.uid);
    return updateDoc(userToUpdate, {trustScore: updatedTrustScore})
              .then((success) => success)
              .then((err) => {
                console.log(err);
                return err;
              })
  }
};

const thumbsDown = (user) => {
  if (user.trustScore === 0) {
    return new Error({message: 'User is at 0 and cannot be decremented'})
  } else {
    const updatedTrustScore = user.trustScore - 1;
    const userToUpdate = doc(db, 'users', user.uid);
    return updateDoc(userToUpdate, {trustScore: updatedTrustScore})
      .then((success) => success)
      .then((err) => {
        console.log(err);
        return err;
      })
  }
}

//POST request for User with an array of lattitude and longitude as an arry with key location
// const  UpdateUser = (userObject) => {
//   const obj = {
//     authProvider: userObject.authProvider,
//     email: userObject.email,
//     name: userObject.name,
//     photo: userObject.photo,
//     trustScore: userObject.trustScore,
//     type: userObject.type,
//     location: userObject.location,
//     uid: userObject.uid
//    }
//   return setDoc(doc(db,'users',userObject.uid),obj);
//  // return addDoc(userRef, {
//   //})
// };

const updateUser = (id, itemObject) => {
  //console.log('Iriving need this ', id)
  return updateDoc(doc(db,'users',id), itemObject);
};


// const docToUpdate = doc(db, 'items', id);
//   return updateDoc(docToUpdate, { isActive: false })
//   .then((success) => {
//     return success;
// });
module.exports = {
  getUsers,
  getUser,
  thumbsUp,
  thumbsDown,
  getUsersAndProducts,
  getItemsForUser,
  getTrustScore,
  updateUser
}