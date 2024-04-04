import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatDate, getMonthName, getStartEndDate } from "../../assets/months";
import { db } from "../../Config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import ProgressBar from "../../components/ProgressBar";
import { formatCurrency } from "../../assets/currency/formatCurrency";

function Budget({ budgetData }) {
  //need to retrieve all transactions of this type from this month
  const [transactions, setTransactions] = useState([]);
  const [transactionDays, setTransactionDays] = useState([]);
  const [startDate, setStartDate] = useState(getStartEndDate().startDate);
  const [EndDate, setEndDate] = useState(getStartEndDate().endDate);
  const [transactionMonth, setTransactionMonth] = useState("");
  const transactionsCollectionRef = collection(db, "transactions");

  useEffect(() => {
    const getTransactions = async () => {
      try {
        // console.log(`UseEffect Start ${startDate}, end ${EndDate}`);
        const q1 = await query(
          transactionsCollectionRef,
          where("date", ">=", budgetData.startDate),
          where("date", "<=", EndDate),
          where("category", "in", budgetData.budgetFor)
        );

        const data = await getDocs(q1);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setTransactions(filteredData);

        console.log("TransactionData", filteredData);

        let dateArray = filteredData.map((value) => value.date);
        let dates = dateArray.filter(
          (value, index) => dateArray.indexOf(value) === index
        );

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

  let totalTransactionAmount = 0;
  totalTransactionAmount = transactions.reduce(
    (accumulator, currenValue) =>
      accumulator + Math.abs(currenValue.transactionAmount),
    totalTransactionAmount
  );

  let goalPercentage = (totalTransactionAmount / budgetData.amount) * 100;
  goalPercentage = goalPercentage > 100 ? 100 : goalPercentage;

  let remainingAmount = budgetData.amount - totalTransactionAmount;

  console.log("L2 Data", budgetData);
  console.log("totalTransactionAmount", totalTransactionAmount);

  return (
    <div>
      <Link
        to={`/budget/${budgetData.id}`}
        state={{ transactions: transactions }}
      >
        <h3 className="text-complement2 text-lg">{budgetData.name}</h3>
        <div className="bg-secondary rounded-md p-2">
          {remainingAmount > 0 ? (
            <p className="text-text text-sm">
              <span>
                You have {formatCurrency(remainingAmount)} left out of{" "}
                {formatCurrency(budgetData.amount)}
              </span>
            </p>
          ) : (
            <p className="text-text text-sm">
              <span>
                You have exceeded your {formatCurrency(budgetData.amount)}{" "}
                budget by: {formatCurrency(remainingAmount)}!
              </span>
            </p>
          )}

          {/* <div className=" bg-neutral-200 dark:bg-neutral-600 ">
          <div
            className="bg-green-500 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
            style={{ width: `${goalPercentage}%` }}
          >
            <p>{goalPercentage} %</p>
          </div>
        </div> */}

          <ProgressBar percentage={goalPercentage} />
          <div>
            <ul className="flex justify-between text-text text-xs mt-2">
              <li>{formatDate(budgetData.startDate)}</li>
              <li>January 31, 2024</li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Budget;
