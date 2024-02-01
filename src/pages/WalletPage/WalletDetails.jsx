import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../Config/firebase";
import { doc, getDoc } from "firebase/firestore";

function WalletDetails() {
  const params = useParams();
  const docRef = doc(db, "wallets", params.id);
  console.log("Params", params);
  const [wallet, setWallet] = useState(null);
  const [walletType, setWalletType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // fetch(`/api/wallet/${params.id}`)
    //   .then((response) => response.json())
    //   .catch((err) => console.log("err", err))
    //   .then((data) => setWallet(data.wallets));

    async function getWallet() {
      try {
        const walletData = await getDoc(docRef);
        setWallet(walletData.data());
        setWalletType(walletData.data().walletType);
      } catch (error) {
        console.error(error);
      }
    }

    getWallet();
  }, [params.id]); //re run this request if the id ever changes, useful for calling a new wallet without reloading page

  console.log(wallet);

  return (
    <form className="p-2">
      <div className="mb-4">
        <ul className="flex justify-between">
          <li>
            <button onClick={() => navigate(-1)}>Back</button>
          </li>
          <li>Delete</li>
        </ul>
      </div>
      {wallet ? (
        <div>
          <div>
            <label htmlFor="">Name: </label>
            <input type="text" value={wallet.name} />
          </div>

          <div>
            <label htmlFor="">Bank: </label>
            <input type="text" value={wallet.bank} />
          </div>

          <div>
            <label htmlFor="">Current Balance: </label>
            <span>Balance: ${wallet.initialBalance}</span>
          </div>

          <div>
            <label htmlFor="">Description</label>
            <textarea name="" id=""></textarea>
          </div>

          <div>
            <p>Wallet Type</p>
            {walletType != "savings" ? (
              <>
                <label htmlFor="wallet-type">Default</label>
                <input
                  type="radio"
                  name="wallet-type"
                  id="type-default"
                  value="default"
                  onChange={(e) => setWalletType(e.target.value)}
                  checked={walletType === "default"}
                />
                <label htmlFor="wallet-type">Credit</label>
                <input
                  type="radio"
                  name="wallet-type"
                  id="type-credit"
                  value="credit"
                  onChange={(e) => setWalletType(e.target.value)}
                  checked={walletType === "credit"}
                />
              </>
            ) : (
              <>
                <label htmlFor="wallet-type">Savings</label>
                <input
                  type="radio"
                  name="wallet-type"
                  id="type-credit"
                  value="savings"
                  onChange={(e) => setWalletType(e.target.value)}
                  checked={walletType === "savings"}
                />
              </>
            )}
          </div>

          <button className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0">
            Save Changes
          </button>
        </div>
      ) : (
        <h3>...Loading...</h3>
      )}
    </form>
  );
}

export default WalletDetails;
