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
  const [currentUserData, setCurrentUserData] = useState({});
  const [allItemsForSale, setAllItemsForSale] = useState([]);
  const [hasRated,setHasRated] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [userActiveItems, setUserActiveItems] = useState([]);
  const [userInactiveItems, setUserInactiveItems] = useState([]);
  const auth = getAuth();

  const navigate = useNavigate();

  const loadProfileDataFromApi = (userIdFromAuth) => {
    axios.get(`http://localhost:3001/user/profile/${userIdFromAuth}`)
    .then(res => {
      if (res.data.length) {
        setUserProfile(res.data[0]);
        const userItems = res.data[0].userItems;
        const activeItems = userItems.filter(item => item.isActive)
        const inactiveItems = userItems.filter(item => !item.isActive)
        setUserActiveItems(activeItems);
        setUserInactiveItems(inactiveItems);
      }
    })
    .catch(e => console.log(e))
  };

  useEffect(() => {
    axios.get('http://localhost:3001/user/all')
      .then(response => {
          const userData = response.data;
          setAllUsers(userData);
          let itemsForSale = [];

          userData.forEach(user => {
            user.userItems.forEach(item => {
              item.trustScore = user.trustScore;
              item.sellerName = user.name;
              item.userItems = user.userItems;
              itemsForSale.push(item);
            })
          });

          setAllItemsForSale(itemsForSale);
      });
  }, []);

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

  useEffect(() => {
    const loggedInUserId = currentUserData.id;
    loadProfileDataFromApi(loggedInUserId);
  }, [currentUserData]);

  const value = {
    currentUser,
    currentUserData,
    allUsers,
    allItemsForSale,
    hasRated,
    setHasRated,
    modal,
    setModal,
    userProfile,
    setUserActiveItems,
    setUserInactiveItems,
    userActiveItems,
    userInactiveItems,
    loadProfileDataFromApi,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
