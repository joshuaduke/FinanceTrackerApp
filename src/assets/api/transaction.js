import { db } from "../../Config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
const transactionsCollectionRef = collection(db, "transactions");
import {
    getMonthName,
    getMonthLastDay,
    getStartEndDate,
  } from "../../assets/months";


export async function getTransactionsAPI(q1){
    try {
        // console.log(`UseEffect Start ${startDate}, end ${EndDate}`);

        // const q1 = query(
        //   transactionsCollectionRef,
        //   where("user", "==", user.uid)
        // );

        const data = await getDocs(q1);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

    return filteredData;


      } catch (error) {
        console.error(error);
      }
}

export function sortTransactionsByDate(transactionArr){
  try {
    console.log("Transaction Arr: ", transactionArr);
    let dateArray = transactionArr.map((value) => value.date);
    console.log("Date Array", dateArray);
    let dates = dateArray.filter(
      (value, index) => dateArray.indexOf(value) === index
    );


    console.log("returned dates", dates);

    dates.sort((a, b) => {
      let dateA = new Date(a);
      let dateB = new Date(b);
      return dateB - dateA;
    });


    return dates;
  } catch (error) {
    console.error(error);
  }
}


export async function getTransactions(startDate, EndDate, setTransactions, setTransactionMonth){
    try {
        // console.log(`UseEffect Start ${startDate}, end ${EndDate}`);
        const q1 = await query(
          transactionsCollectionRef,
          where("date", ">=", startDate),
          where("date", "<=", EndDate)
        );

        const data = await getDocs(q1);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // retrieve the name of the month
        let getStartDateMonth = startDate.substring(5, 7);
        let transMonthObj = getMonthName(getStartDateMonth);
        setTransactionMonth(transMonthObj.month);

    return filteredData;


      } catch (error) {
        console.error(error);
      }
}

export async function getTransferTransactions(walletId){
  try {
      // console.log(`UseEffect Start ${startDate}, end ${EndDate}`);
      const q1 = await query(
        transactionsCollectionRef,
        where("toWalletId", "==", walletId),
      );

      const data = await getDocs(q1);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

  return filteredData;


    } catch (error) {
      console.error(error);
    }
}