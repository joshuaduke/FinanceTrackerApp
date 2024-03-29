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
  formatDate,
  getCurrentDate,
} from "../../assets/months";
import { sortTransactionsByDate } from "../../assets/api/transaction";
import CashFlow from "../../components/CashFlow";
import TransactionChart from "../../components/transactionChart";
import Period from "../../components/Period";
import {
  format,
  getMonth,
  getYear,
  lastDayOfMonth,
  lastDayOfYear,
} from "date-fns";
import ImportanceChart from "../../components/ImportanceChart";
import CategoryChart from "../../components/CategoryChart";

// FIX ISSUE WITH DATE APPENDING EXTRA 0 - 001 002 ehen clickin next or previous button

function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [transactionDays, setTransactionDays] = useState([]);
  const [startDate, setStartDate] = useState(getStartEndDate().startDate);
  const [EndDate, setEndDate] = useState(getStartEndDate().endDate);
  const [period, setPeriod] = useState("month");
  const [transactionMonth, setTransactionMonth] = useState("");
  const transactionsCollectionRef = collection(db, "transactions");

  //verify if this can be deleted

  useEffect(() => {
    const getTransactions = async () => {
      try {
        console.log(`UseEffect Start ${startDate}, end ${EndDate}`);
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

        setTransactions(filteredData);

        let dates = sortTransactionsByDate(filteredData);

        setTransactionDays(dates);

        // retrieve the name of the month
        if (period === "month") {
          setTransactionMonth(
            format(new Date(`${startDate}T00:00:00`), "LLLL")
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    getTransactions();
  }, [startDate, EndDate]);

  function getPreviousPeriodTransactions() {
    let pageDate = new Date(`${startDate}T00:00:00`);
    let pageMonth = getMonth(pageDate) + 1;
    let pageYear = getYear(pageDate);
    let previousMonth = 0;
    let newStartDate = "";
    let newEndDate = "";

    // FOR MONTHS
    console.log("PERIOD STATE", period);
    switch (period) {
      case "year":
        pageYear--;
        newStartDate = `${pageYear}-01-01`;
        newEndDate = `${pageYear}-12-31`;
        setTransactionMonth(pageYear);
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        break;
      case "week":
        break;
      case "all":
        break;
      default:
        //if january we need to get the last month of the previous year
        if (pageMonth === 1) {
          previousMonth = 12;
          pageYear--;
        } else {
          pageMonth--;
          previousMonth = pageMonth <= 9 ? `0${pageMonth}` : pageMonth;
        }

        newStartDate = `${pageYear}-${previousMonth}-01`;
        newEndDate = format(
          lastDayOfMonth(new Date(`${newStartDate}T00:00:00`)),
          "yyyy-MM-dd"
        );

        setTransactionMonth(format(pageDate, "LLLL"));
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        break;
    }
  }

  function getNextPeriodTransaction() {
    // add condition to ensure to not click to future months past the current date
    let pageDate = new Date(`${startDate}T00:00:00`);
    let pageMonth = getMonth(pageDate) + 1;
    let pageYear = getYear(pageDate);
    let newStartDate = "";
    let newEndDate = "";
    let currentDate = getCurrentDate();
    let nextMonth = 0;

    switch (period) {
      case "year":
        pageYear++;
        newStartDate = `${pageYear}-01-01`;
        newEndDate = `${pageYear}-12-31`;
        setTransactionMonth(pageYear);
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        break;
      case "week":
        break;
      case "all":
        break;
      default:
        //prevent from viewing next month if there is no data
        if (nextMonth > currentDate.substring(5, 7)) {
          return;
        }

        //if january we need to get the last month of the next year
        if (pageMonth === 12) {
          nextMonth = `${nextMonth}${1}`;
          pageYear++;
        } else {
          pageMonth++;
          nextMonth = pageMonth <= 9 ? `0${pageMonth}` : pageMonth;
        }

        newStartDate = `${pageYear}-${nextMonth}-01`;
        newEndDate = format(
          lastDayOfMonth(new Date(`${newStartDate}T00:00:00`)),
          "yyyy-MM-dd"
        );

        setTransactionMonth(format(pageDate, "LLLL"));
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        break;
    }
  }

  function periodChanged(e) {
    const newPeriod = e.target.value;
    const currentDate = new Date();

    setPeriod(e.target.value);
    switch (newPeriod) {
      case "month":
        setStartDate(format(currentDate, "yyyy-MM-01"));
        setEndDate(format(lastDayOfMonth(currentDate), "yyyy-MM-dd"));
        setTransactionMonth(format(currentDate, "LLLL"));
        break;
      case "year":
        setStartDate(format(currentDate, "yyyy-01-01"));
        setEndDate(format(lastDayOfYear(currentDate), "yyyy-MM-dd"));
        setTransactionMonth(getYear(currentDate));
        break;
      case "week":
        setStartDate();
        setEndDate();
        setTransactionMonth();
        break;
      case "all":
        setStartDate();
        setEndDate();
        setTransactionMonth();
        break;
      default:
        break;
    }
  }

  return (
    <div id="home-page" className="py-2 bg-bgPrimary lg:px-16 xl:px-32 ">
      <h1 className="mt-16 2xl:ml-64 px-2 text-white text-2xl">J-SPENDER</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 p-3 pb-24 2xl:w-10/12 2xl:my-0 2xl:mx-auto">
        <section className="col-span-2 border-solid border-2 border-zinc-700 rounded-l-lg justify-center px-2 py-4 bg-secondary">
          <Link to="/overview" className="text-white">
            Overview
          </Link>
          <Period period={period} setPeriod={periodChanged} />
          <TransactionChart
            transactionDays={transactionDays}
            transactions={transactions}
            period={period}
          />
        </section>

        <article className="flex-none hidden md:block">
          <section
            id="category-graph"
            className="border-solid border-t-2 border-r-2 border-zinc-700 rounded-tr-lg py-2 bg-secondary"
          >
            <CategoryChart
              transactionDays={transactionDays}
              transactions={transactions}
              period={period}
            />
          </section>

          <section
            id="category-graph"
            className="border-solid border-b-2 border-r-2 border-zinc-700 rounded-br-lg py-2 bg-secondary"
          >
            <ImportanceChart
              transactionDays={transactionDays}
              transactions={transactions}
              period={period}
            />
          </section>
        </article>

        <section
          className="col-span-2 md:mr-4 mt-4 p-2 flex-auto h-fit border-solid border-2 border-zinc-700 rounded "
          id="transaction-list"
        >
          <CashFlow transactions={transactions} />
          <h2 className="text-white">Transactions</h2>

          <div className="grid grid-cols-3 px-4">
            <div>
              <button onClick={getPreviousPeriodTransactions}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                  />
                </svg>
              </button>
            </div>

            <h3 className="text-center text-white">{transactionMonth}</h3>

            <div className="justify-self-end">
              <button onClick={getNextPeriodTransaction}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g transform="rotate(180 12 12) translate(0 24) scale(1 -1)">
                    <path
                      fill="white"
                      d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                    />
                  </g>
                </svg>
              </button>
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
        </section>

        <article className="hidden md:block">
          <section
            id="importance-graph"
            className="border-solid border-2 border-zinc-700 rounded mt-4 py-2 bg-secondary"
          >
            <TransactionChart transactions={transactions} />
          </section>
        </article>
      </div>

      <Link className="fixed bottom-20 right-5 mb-5 " to="/transaction/new">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
        >
          <path
            fill="white"
            d="M16 2A14.173 14.173 0 0 0 2 16a14.173 14.173 0 0 0 14 14a14.173 14.173 0 0 0 14-14A14.173 14.173 0 0 0 16 2Zm8 15h-7v7h-2v-7H8v-2h7V8h2v7h7Z"
          />
          <path fill="green" d="M24 17h-7v7h-2v-7H8v-2h7V8h2v7h7v2z" />
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
