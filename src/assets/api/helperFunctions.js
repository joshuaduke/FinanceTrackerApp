import { db } from "../../Config/firebase";
import { getDocs, collection, query, where, deleteDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export function deleteDocument(docRef){
    try {
        let confirmText = "Are you sure you want to delete this wallet?";
  
        if (confirm(confirmText) == true) {
          deleteDoc(docRef);
          return true;
        } else {
            return false;
        }
      } catch (error) {
        console.log("Error in deleteWallet function");
        console.error(error);
      }
}

export async function getCurrentUserData(userId){
  try {
    console.log("Id",userId)
    const q = query(collection(db, "users"), where("userId", "==", userId))
    const userData = await getDocs(q);
    const filteredData = userData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("userData", filteredData[0]);
    return filteredData[0];
  } catch (error) {
    console.log("Error in deleteWallet function");
    console.error(error);
  }
}