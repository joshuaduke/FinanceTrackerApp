import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMonthName, getStartEndDate } from "../../assets/months";
import { db } from "../../Config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import ProgressBar from "../../components/ProgressBar";

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
          where("date", ">=", startDate),
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
    <>
      <Link to={`/budget/${budgetData.id}`}>
        <h3>{budgetData.name}</h3>

        {remainingAmount > 0 ? (
          <p>
            <span>You have ${remainingAmount}</span> left out of $
            {budgetData.amount}
          </p>
        ) : (
          <p>
            <span>
              You have exceeded your ${budgetData.amount} budget by: $
              {remainingAmount} please do better :8
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
          <ul className="flex justify-between">
            <li>January 1, 2024</li>
            <li>January 31, 2024</li>
          </ul>
        </div>
      </Link>
    </>
  );
}

export default Budget;
