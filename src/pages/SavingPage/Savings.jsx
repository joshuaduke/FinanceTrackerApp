import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getTransferTransactions } from "../../assets/api/transaction";
import {
  getMonthName,
  getMonthLastDay,
  getStartEndDate,
} from "../../assets/months";

function SavingsGoal({ data }) {
  const [startDate, setStartDate] = useState(getStartEndDate().startDate);
  const [EndDate, setEndDate] = useState(getStartEndDate().endDate);
  const [transactions, setTransactions] = useState([]);
  const [transactionDays, setTransactionDays] = useState([]);
  const [transactionMonth, setTransactionMonth] = useState("");

  let savingsAmount = 0;

  useEffect(() => {
    try {
      getTransferTransactions(data.walletId).then((value) => {
        setTransactions(value);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  transactions?.map((item) => {
    savingsAmount += item.transactionAmount;
  });

  const goalPercentage = Math.round((savingsAmount / data.goal) * 100);

  console.log("Test Data", transactions);
  return (
    <>
      <Link to={`/savings/${data.id}`}>
        <h3>{data.name}</h3>
        <p>
          <span>You saved ${savingsAmount}</span> saved out of ${data.goal}
        </p>
        <div className=" bg-neutral-200 dark:bg-neutral-600 ">
          <div
            className="bg-green-500 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
            style={{ width: `${goalPercentage}%` }}
          >
            <p>{goalPercentage} %</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default SavingsGoal;
