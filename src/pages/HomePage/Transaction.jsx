import CategoryIcon from "../../components/CategoryIcon";
import { Link } from "react-router-dom";

function Transaction(props) {
  const data = props.value;
  let amount = props.dateAmount;
  amount += parseInt(data.transactionAmount);

  //   if (props.updateTransactionAmountTotal != false) {
  //     props.updateTransactionAmountTotal(amount);
  //   } else {
  //     return false;
  //   }

  //   let dailyTotalTransactionAmount = 0;
  //   console.log(typeof data.transactionAmount.toString());
  //   console.log("transactionProps", props);

  return (
    <div>
      {/* <Link to={`/transaction/${data.id}`}> */}
      <div
        className="flex justify-between items-center px-5 py-3"
        id="transaction-item"
      >
        <CategoryIcon className="basis-1/4" category={data.category} />
        <div className="basis-1/2">
          <p>{data.description}</p>
          <p>{data.wallet}</p>
        </div>
        <div className="basis-1/4 text-end">
          <p>{data.transactionAmount}</p>
        </div>
      </div>

      {/* {props.updateTransactionAmountTotal != false ? (
        <button onClick={() => props.updateTransactionAmountTotal(amount)}>
          Click
        </button>
      ) : (
        <p>False</p>
      )} */}
    </div>
  );
}

export default Transaction;
