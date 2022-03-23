/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [allItemsForSale, setAllItemsForSale] = useState([]);
  const auth = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/user/all')
      .then(response => {
          const userData = response.data;
          setAllUsers(userData);
          // setState to all Users
          let itemsForSale = [];
          userData.forEach(user => {
            user.userItems.forEach(item => {
              item.trustScore = user.trustScore;
              item.sellerName = user.name;
              item.userItems = user.userItems;
              itemsForSale.push(item);
            })
          });
          // setState to itemsForSale
          setAllItemsForSale(itemsForSale);
      });
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const docs = await getDocs(q);
        setCurrentUserData(docs.docs[0].data());
      } else {
        if (!user) return navigate("/");
      }
    });
  }, []);

  console.log(allUsers, 'ALL USERS');
  console.log(allItemsForSale, 'ALL ITEMS');

  const value = {
    currentUser,
    currentUserData,
    allUsers,
    allItemsForSale,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
