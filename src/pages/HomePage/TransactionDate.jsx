import Transaction from "./Transaction";

function TransactionDate(props) {
  let data = props.transactions;

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
      <div id="date">
        <ul className="flex justify-between border p-2">
          {/* <li>{date} - Date</li> */}
          <li>{props.date}</li>
          <li>{totalDateAmount}</li>
          {/* <li>{data.transactionAmount > 0 ? '$' + data.transactionAmount : '-$' + data.transactionAmount.toString().replace('-', '')}</li> */}
          {/* <li>{props.dateAmount}</li> */}
        </ul>
      </div>
      {totalDateAmountArr.map((transactionData) => (
        <Transaction key={transactionData.id} value={{ transactionData }} />
      ))}
    </div>
  );
}

export default TransactionDate;
