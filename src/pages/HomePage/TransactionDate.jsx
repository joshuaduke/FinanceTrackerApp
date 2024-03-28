import Transaction from "./Transaction";
import { formatCurrency } from "../../assets/currency/formatCurrency";
import { months, formatDate } from "../../assets/months";

function TransactionDate(props) {
  console.log("Transaction Date Props", props);
  // let data = props.transactions;

  //   const data = props.value;
  //   const dateAmount = parseInt(props.dateAmount);
  //   const updateAmountTotal = props.updateTransactionAmountTotal;

  //   const date = props.value;
  //   //   const transactions = props.transactions;
  let totalDateAmount = 0;
  let totalDateAmountArr = props.transactions.filter(
    (value) => value.date === props.date
  );

  totalDateAmountArr = totalDateAmountArr.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateB - dateA;
  });

  totalDateAmountArr.forEach((element) => {
    totalDateAmount += element.transactionAmount;
  });

  //let dailyTotalTransactionAmount = 0;
  // console.log(typeof data.transactionAmount.toString())
  //   if (props.tempDate === data.TransactionDate) {
  //     console.log("updateAmountTotal", props.updateAmountTotal);
  //     props.updateTransactionAmountTotal(dateAmount);
  //   } else {
  //     props.updateTransactionAmountTotal(0);
  //   }

  return (
    <div>
      <div id="date" className="">
        <ul className="flex justify-between p-2 text-complement2">
          {/* <li>{date} - Date</li> */}
          <li>{formatDate(props.date)}</li>
          <li
            className={totalDateAmount < 0 ? "text-red-500" : "text-green-500"}
          >
            {formatCurrency(totalDateAmount)}
          </li>
          {/* <li>{data.transactionAmount > 0 ? '$' + data.transactionAmount : '-$' + data.transactionAmount.toString().replace('-', '')}</li> */}
          {/* <li>{props.dateAmount}</li> */}
        </ul>
      </div>
      {totalDateAmountArr.map((transactionData) => {
        return (
          <div key={transactionData.id}>
            <Transaction value={{ transactionData }} />
          </div>
        );
      })}
    </div>
  );
}

export default TransactionDate;
