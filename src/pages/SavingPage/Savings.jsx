import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getTransferTransactions } from "../../assets/api/transaction";
import {
  getMonthName,
  getMonthLastDay,
  getStartEndDate,
} from "../../assets/months";
import { formatCurrency } from "../../assets/currency/formatCurrency";
import { formatDate } from "../../assets/months";

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
      <Link
        to={`/savings/${data.id}`}
        state={{
          savingsData: data,
          savingsAmount: savingsAmount,
          transactions: transactions,
        }}
      >
        <h3 className="text-yellow-700">{data.name}</h3>
        <p>
          You saved <span>{formatCurrency(savingsAmount)}</span> saved out of
          <span> {formatCurrency(data.goal)}</span>
        </p>
        <div className=" bg-neutral-200 dark:bg-neutral-600 ">
          <div
            className="bg-green-500 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
            style={{ width: `${goalPercentage}%` }}
          >
            <p>{Math.ceil(goalPercentage)} %</p>
          </div>
        </div>
        <div>
          <ul className="flex justify-end">
            {/* <li>{formatDate(data.createdDate)}</li> */}
            <li>Due: {formatDate(data.dueDate)}</li>
          </ul>
        </div>
      </Link>
    </>
  );
}

export default SavingsGoal;
