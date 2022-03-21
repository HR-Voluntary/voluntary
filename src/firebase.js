import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  doc,
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  setDoc,
  updateDoc,
}
from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app);
const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {

  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: user.displayName,
        trustScore: 1,
        authProvider: 'facebook',
        email: user.email,
        photo: user.photoURL,
        type: 'Individual',
        location: [],
        transactionCount: 0,
        ratingsScore: 0,
        ratingsCount: 0,
        active: true,
      });
    } else {
      const docToUpdate = doc(db, 'users', user.uid);
      updateDoc(docToUpdate, { active: true} );
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: user.displayName,
        trustScore: 1,
        authProvider: 'facebook',
        email: user.email,
        photo: user.photoURL,
        type: 'Individual',
        location: [],
        transactionCount: 0,
        ratingsScore: 0,
        ratingsCount: 0,
        active: true,
      });
    } else {
      const docToUpdate = doc(db, 'users', user.uid);
      updateDoc(docToUpdate, { active: true} );
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const docToUpdate = doc(db, 'users', auth.currentUser.uid);
    updateDoc(docToUpdate, { active: true } );
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password, type) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name: user.displayName,
      trustScore: 1,
      authProvider: 'facebook',
      email: user.email,
      photo: user.photoURL,
      type: 'Individual',
      location: [],
      transactionCount: 0,
      ratingsScore: 0,
      ratingsCount: 0,
      active: true,
    })
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = async () => {
  const user = auth.currentUser.uid;
  const docToUpdate = doc(db, 'users', user);
  updateDoc(docToUpdate, { active: false } );

  await signOut(auth);
  alert('You have been logged out')
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithFacebook,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};