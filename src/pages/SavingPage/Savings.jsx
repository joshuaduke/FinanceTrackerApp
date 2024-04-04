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
import ProgressBar from "../../components/ProgressBar";

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
    <div>
      <Link
        to={`/savings/${data.id}`}
        state={{
          savingsData: data,
          savingsAmount: savingsAmount,
          transactions: transactions,
        }}
      >
        <h3 className="text-complement2">{data.name}</h3>
        <div className="bg-secondary rounded-md p-2">
          <p className="text-text text-sm">
            You saved <span>{formatCurrency(savingsAmount)}</span> saved out of
            <span> {formatCurrency(data.goal)}</span>
          </p>
          <div className=" bg-neutral-200 dark:bg-neutral-600 ">
            <ProgressBar percentage={goalPercentage} />
          </div>
          <div>
            <ul className="flex justify-end text-text text-xs mt-2">
              {/* <li>{formatDate(data.createdDate)}</li> */}
              <li>Due: {formatDate(data.dueDate)}</li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SavingsGoal;
