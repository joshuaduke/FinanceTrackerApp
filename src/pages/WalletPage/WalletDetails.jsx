import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function WalletDetails() {
  const params = useParams();
  const [wallet, setWallet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/wallet/${params.id}`)
      .then((response) => response.json())
      .catch((err) => console.log("err", err))
      .then((data) => setWallet(data.wallets));
  }, [params.id]); //re run this request if the id ever changes, useful for calling a new wallet without reloading page

  console.log(wallet);

  return (
    <div className="p-2">
      <div className="mb-4">
        <ul className="flex justify-between">
          <li>
            <button onClick={() => navigate(-1)}>Back</button>
          </li>
          <li>Wallets</li>
        </ul>
      </div>
      {wallet ? (
        <div>
          <h1>{wallet.name}</h1>
          <p>Bank {wallet.bank}</p>
          <p>Balance: ${wallet.initialBalance}</p>
        </div>
      ) : (
        <h3>...Loading...</h3>
      )}
    </div>
  );
}

export default WalletDetails;
