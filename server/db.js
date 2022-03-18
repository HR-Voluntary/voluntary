const { getModularInstance } = require('@firebase/util');
const { initializeApp } = require('firebase/app');
const {
getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} = require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBUK5G4AtY1cSec_P_mCORsNJXMvPV2xg",
  authDomain: "voluntary-a8b0a.firebaseapp.com",
  projectId: "voluntary-a8b0a",
  storageBucket: "voluntary-a8b0a.appspot.com",
  messagingSenderId: "745379644506",
  appId: "1:745379644506:web:3b0489090e670ecb78c463"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Connect to Firestore:
const db = getFirestore(app);

// collectionRef:
const userRef = collection(db, 'user');
const irvingRef = collection(db, 'user','irving');
await updateDoc(irvingRef, {
  car:'jim',

});

// get data
getDocs(userRef)
  .then((snapshot) => {
    snapshot.docs.forEach(doc => console.log(doc.id))
  });

const addDocument = (userObject) => {
  return addDoc(userRef, {
    first: userObject.first,
    last: userObject.last,
    location: userObject.location,
    car: userObject.car
  })
};

// addDocument({first: 'Irving', last: 'IIIIRIVAAANG!', location: 'Cali', car: {
//   fuel: 'gasoline',
//   gallons: 15
// }})
//   .then((success) => console.log(success));

module.exports = {
  db
}