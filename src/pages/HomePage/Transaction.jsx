import CategoryIcon from "../../components/CategoryIcon";
import { Link } from "react-router-dom";

function Transaction(props) {
  const data = props.value;

  return (
    <div>
      <Link to={`/transaction/${data.id}`}>
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
      </Link>
    </div>
  );
}

export default Transaction;
