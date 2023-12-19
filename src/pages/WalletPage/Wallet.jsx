import { Link } from "react-router-dom";

function WalletList(props) {
  const value = props.value;
  return (
    <div className="p-2">
      <Link className="flex justify-between" to={`/wallet/${value.id}`}>
        <div>
          <h3>{value.name}</h3>
          <p>{value.bank}</p>
        </div>
        <div>
          <p>${value.initialBalance}</p>
        </div>
      </Link>
    </div>
  );
}

export default WalletList;
