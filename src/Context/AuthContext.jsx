import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/firebase";
import { getCurrentUserData } from "../assets/api/helperFunctions";

export const Context = createContext();

export function AuthContext({ children }) {
  const [user, setUser] = useState();
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        setUser(currentUser);

        const getfirebaseUserData = async () => {
          try {
            const firebaseUserData = await getCurrentUserData(currentUser.uid);
            console.log("firebaseUserData", firebaseUserData);
            setUserData({ ...userData, ...firebaseUserData });
          } catch (error) {
            console.error("Error in getFirebaseUserData", error);
          }
        };
        getfirebaseUserData();
      } else {
        setUser(null);
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  console.log("Data from Firebase", userData);

  const values = {
    user: user,
    userData: userData,
    setUser: setUser,
  };

  return (
    <Context.Provider value={values}>{!loading && children}</Context.Provider>
  );
}

// console.log(currentUser);
// setUserData(getCurrentUserData(user.uid));
// console.log("UserData", userData);
