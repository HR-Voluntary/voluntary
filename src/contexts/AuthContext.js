/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
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
  const auth = getAuth();

  const navigate = useNavigate();

  const user = auth.currentUser;

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

  const value = {
    currentUser,
    currentUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
