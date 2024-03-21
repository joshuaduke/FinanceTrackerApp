import { db } from "../../Config/firebase";
import { getDocs, collection, query, where, deleteDoc } from "firebase/firestore";
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

