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

    // console.log(itemArray);

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

getUsersAndProducts();

const getUser = (id) => {
  return getDocs(userRef)
    .then((snapshot) => {
      const doc = snapshot.docs.filter(doc => doc.id === id);
      return {...doc[0].data()};
    });
};

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


// const docToUpdate = doc(db, 'items', id);
//   return updateDoc(docToUpdate, { isActive: false })
//   .then((success) => {
//     return success;
// });
module.exports = {
  // createUser,
  getUsers,
  getUser,
  thumbsUp,
  thumbsDown,
  getUsersAndProducts
}