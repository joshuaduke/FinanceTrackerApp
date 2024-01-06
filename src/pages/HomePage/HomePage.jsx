import Footer from "../../components/footer/footer";
import TransactionDate from "./TransactionDate";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { db } from "../../Config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import {
  getMonthName,
  getMonthLastDay,
  getStartEndDate,
} from "../../assets/months";

function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [transactionDays, setTransactionDays] = useState([]);
  const [startDate, setStartDate] = useState(getStartEndDate().startDate);
  const [EndDate, setEndDate] = useState(getStartEndDate().endDate);
  const [transactionMonth, setTransactionMonth] = useState("");
  const transactionsCollectionRef = collection(db, "transactions");

  //verify if this can be deleted
  getStartEndDate();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const q1 = await query(
          transactionsCollectionRef,
          where("date", ">=", startDate),
          where("date", "<=", EndDate)
        );
        console.log("Query Results", q1);
        const data = await getDocs(q1);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(`UseEffect Start ${startDate}, end ${EndDate}`);
        console.log("filtered", filteredData);
        setTransactions(filteredData);

        // console.log("Data Docs", filteredData);

        let dateArray = filteredData.map((value) => value.date);

        // console.log("Date Array", dateArray);

        let dates = dateArray.filter(
          (value, index) => dateArray.indexOf(value) === index
        );
        // console.log("dates", dates);
        dates.sort((a, b) => {
          let dateA = new Date(a);
          let dateB = new Date(b);
          return dateB - dateA;
        });

        setTransactionDays(dates);

        // retrieve the name of the month
        let getStartDateMonth = startDate.substring(5, 7);
        let transMonthObj = getMonthName(getStartDateMonth);
        setTransactionMonth(transMonthObj.month);
      } catch (error) {
        console.error(error);
      }
    };

    getTransactions();
  }, [startDate, EndDate]);

  function getPreviousMonthTransactions() {
    let currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + 1);
    console.log("Start Date Previous", startDate, currentDate);
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    let previousMonth = 0;
    console.log("currentMonth", currentMonth, typeof currentMonth);
    //if january we need to get the last month of the previous year
    if (currentMonth === 1) {
      previousMonth = 12;
      currentYear--;
    } else {
      currentMonth--;
      previousMonth = currentMonth <= 9 ? `0${currentMonth}` : currentMonth;
    }

    let transMonthObj = getMonthName(`${previousMonth}`);
    console.log("transMonthObj", transMonthObj);
    setTransactionMonth(transMonthObj.month);
    setStartDate(`${currentYear}-${previousMonth}-01`);
    setEndDate(`${getMonthLastDay(currentYear, previousMonth)}`);
  }

  function getNextMonthTransaction() {
    // add condition to ensure to not click to future months past the current date
    let currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + 1);
    console.log("Start Date next", startDate, currentDate);
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    let nextMonth = 0;
    console.log("currentMonth", currentMonth, typeof currentMonth);
    //if january we need to get the last month of the previous year
    if (currentMonth === 12) {
      nextMonth = `0${1}`;
      currentYear++;
    } else {
      currentMonth++;
      nextMonth = currentMonth <= 9 ? `0${currentMonth}` : currentMonth;
    }

    let transMonthObj = getMonthName(`${nextMonth}`);
    console.log("transMonthObj", transMonthObj);
    setTransactionMonth(transMonthObj.month);
    setStartDate(`${currentYear}-${nextMonth}-01`);
    setEndDate(`${getMonthLastDay(currentYear, nextMonth)}`);
  }

  return (
    <div id="home-page" className="py-2 pb-10">
      <button>Overview</button>

      <div className="h-screen">
        <div className="grid grid-cols-3">
          <div>
            <button onClick={getPreviousMonthTransactions}>Previous</button>
          </div>
          <h2 className="text-center">
            {startDate} {transactionMonth}
          </h2>
          <div>
            <button onClick={getNextMonthTransaction}>Next</button>
          </div>
        </div>

        {transactionDays ? (
          transactionDays.map((date, index) => (
            <TransactionDate
              key={index}
              date={date}
              transactions={transactions}
            />
          ))
        ) : (
          <p>Error</p>
        )}
      </div>
      <Link className="fixed bottom-20 right-5 mb-5" to="/transaction/new">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M16 2A14.173 14.173 0 0 0 2 16a14.173 14.173 0 0 0 14 14a14.173 14.173 0 0 0 14-14A14.173 14.173 0 0 0 16 2Zm8 15h-7v7h-2v-7H8v-2h7V8h2v7h7Z"
          />
          <path fill="white" d="M24 17h-7v7h-2v-7H8v-2h7V8h2v7h7v2z" />
        </svg>
      </Link>

      <Footer />
    </div>
  );
}

export default HomePage;

// fetch("/api/transaction")
//   .then((response) => response.json())
//   .catch((err) => console.log("err", err))
//   .then((data) => {
//     console.log("Data", data);

//     let transactionsData = data.transactions;
//     let dateArray = transactionsData.map((value) => value.date);

//     console.log("Date arrat", dateArray);
//     function removeDuplicateDates(data) {
//       let dates = data.filter(
//         (value, index) => data.indexOf(value) === index
//       );
//       console.log("dates", dates);
//       return dates.sort((a, b) => {
//         let dateA = new Date(a);
//         let dateB = new Date(b);
//         return dateB - dateA;
//       });
//     }

//     setTransactionDays(removeDuplicateDates(dateArray));
//     setTransactions(transactionsData);
// let sortedTransactions = () =>
//   data.transactions.sort((a, b) => {
//     let dateA = new Date(a.date);
//     let dateB = new Date(b.date);
//     return dateB - dateA;
//   });
// setTransactions(sortedTransactions);
// });
