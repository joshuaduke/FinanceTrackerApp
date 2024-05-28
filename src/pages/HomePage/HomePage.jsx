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
  addDays,
  endOfWeek,
  format,
  getMonth,
  getYear,
  lastDayOfMonth,
  lastDayOfYear,
  startOfWeek,
  subWeeks,
  getDate,
  addWeeks,
} from "date-fns";
import ImportanceChart from "../../components/ImportanceChart";
import CategoryChart from "../../components/CategoryChart";
import { Context } from "../../Context/AuthContext";
import { useContext } from "react";

// FIX ISSUE WITH DATE APPENDING EXTRA 0 - 001 002 ehen clickin next or previous button

function HomePage() {
  const { user } = useContext(Context);
  const [transactions, setTransactions] = useState([]);
  const [transactionDays, setTransactionDays] = useState([]);
  const [startDate, setStartDate] = useState(getStartEndDate().startDate);
  const [EndDate, setEndDate] = useState(getStartEndDate().endDate);
  const [period, setPeriod] = useState("month");
  const [transactionMonth, setTransactionMonth] = useState("");
  const transactionsCollectionRef = collection(db, "transactions");

  console.log("Current User:", user);

  //verify if this can be deleted

  useEffect(() => {
    const getTransactions = async () => {
      try {
        console.log(`UseEffect Start ${startDate}, end ${EndDate}`);
        const q1 = await query(
          transactionsCollectionRef,
          where("user", "==", user.uid),
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
    console.log("Page Date", pageDate);
    let pageMonth = getMonth(pageDate) + 1;
    let pageYear = getYear(pageDate);
    let previousMonth = 0;
    let newStartDate = "";
    let newEndDate = "";
    let currentDate = addDays(new Date(getCurrentDate()), 1);

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
        {
          // get current date set date to current date -7 days
          // subtract 7 days from current date
          let previousWeek = subWeeks(pageDate, 1);
          let previousStartWeek = format(
            startOfWeek(previousWeek),
            "yyyy-MM-dd"
          );
          let previousEndWeek = format(endOfWeek(previousWeek), "yyyy-MM-dd");
          setTransactionMonth(
            "Week of " + format(startOfWeek(previousWeek), "PPP")
          );
          setStartDate(previousStartWeek);
          setEndDate(previousEndWeek);

          console.log("currentdate", previousWeek); // get start and end week from that date
        }
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

    console.log("PERIOD STATE", period);
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
        {
          // get current date set date to current date -7 days
          // subtract 7 days from current date
          let nextWeek = addWeeks(pageDate, 1);
          let nextStartWeek = format(startOfWeek(nextWeek), "yyyy-MM-dd");
          let nextEndWeek = format(endOfWeek(nextWeek), "yyyy-MM-dd");
          setTransactionMonth(
            "Week of " + format(startOfWeek(nextWeek), "PPP")
          );
          setStartDate(nextStartWeek);
          setEndDate(nextEndWeek);

          console.log("currentdate", nextWeek); // get start and end week from that date
        }
        break;
      case "all":
        break;
      default:
        //if january we need to get the last month of the next year
        if (pageMonth === 12) {
          nextMonth = `${nextMonth}${1}`;
          pageYear++;
        } else {
          pageMonth++;
          nextMonth = pageMonth <= 9 ? `0${pageMonth}` : pageMonth;
        }

        //prevent from viewing next month if there is no data

        console.log("NextMonth", nextMonth);
        console.log("Current Date", currentDate.substring(5, 7));
        if (nextMonth > currentDate.substring(5, 7)) {
          console.log("No more data to see");
          return;
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
        setStartDate(format(startOfWeek(currentDate), "yyyy-MM-dd"));
        console.log(
          "Start f the week",
          format(startOfWeek(currentDate), "yyyy-MM-dd")
        );
        setEndDate(format(endOfWeek(currentDate), "yyyy-MM-dd"));
        setTransactionMonth(
          "Week of " + format(startOfWeek(currentDate), "PPP")
        );
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
    <div id="home-page" className=" py-2 bg-bgPrimary lg:px-16 xl:px-32 ">
      <h1 className="my-6 2xl:ml-64 px-3 text-white text-2xl">J-SPENDER</h1>
      <div className=" text-center">
        <Link
          to="/overview"
          state={{
            transactionDays: transactionDays,
            transactions: transactions,
            period: period,
          }}
          className="text-white border-2 border-complement2 p-2 rounded-md bg-secondary"
        >
          Overview
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 p-3 pb-24 2xl:w-10/12 2xl:my-0 2xl:mx-auto">
        <section className="col-span-2 border-solid border-2 border-zinc-700 rounded-l-lg justify-center px-2 py-2 bg-secondary">
          <div className="pb-2">
            <span className="text-text mr-4 ">Period:</span>
            <Period period={period} setPeriod={periodChanged} />
          </div>

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

        <div className="my-4">
          <CashFlow transactions={transactions} />
        </div>

        <section
          className="col-span-2 md:mr-4 mt-4 p-2 flex-auto h-fit border-solid border-2 border-zinc-700 rounded "
          id="transaction-list"
        >
          <h2 className="text-white text-center text-lg py-2">Transactions</h2>

          <div className="grid grid-cols-6 px-4">
            <div className="col-span-1">
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

            <h3 className="text-center text-white col-span-4">
              {transactionMonth}
            </h3>

            <div className="justify-self-end col-span-1">
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

      <Link className="fixed bottom-24 right-5 mb-5" to="/transaction/new">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          className="shadow-sm shadow-impGreen rounded-xl bg-success"
        >
          <path
            className="fill-success "
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
