import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../Config/firebase";
import {
  doc,
  getDoc,
  deleteDoc,
  query,
  where,
  collection,
} from "firebase/firestore";
import { formatCurrency } from "../../assets/currency/formatCurrency";
import { getTransactionsAPI } from "../../assets/api/transaction";
import { deleteDocument } from "../../assets/api/helperFunctions";

function WalletDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const docRef = doc(db, "wallets", params.id);
  const transactionsCollectionRef = collection(db, "transactions");
  const [walletType, setWalletType] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [walletDetails, setWalletDetails] = useState({
    name: "",
    bank: "",
    creditLimit: "",
    balance: "",
    walletType: "",
    description: "",
  });

  useEffect(() => {
    async function getWallet() {
      try {
        const walletData = await getDoc(docRef);

        setWalletDetails({
          name: walletData.data().name,
          bank: walletData.data().bank,
          creditLimit: walletData.data().creditLimit,
          balance: walletData.data().balance,
          walletType: walletData.data().walletType,
          description: walletData.data().description,
        });

        setWalletType(walletData.data().walletType);
      } catch (error) {
        console.error(error);
      }
    }

    const q1 = query(
      transactionsCollectionRef,
      where("walletId", "==", params.id)
    );

    getTransactionsAPI(q1).then((value) => setTransactions(value));

    getWallet();
  }, [params.id]); //re run this request if the id ever changes, useful for calling a new wallet without reloading page

  async function deleteWallet(e) {
    try {
      e.preventDefault();
      const result = deleteDocument(docRef);
      if (result) {
        navigate("/wallet");
      }
    } catch (error) {
      console.log("Error in deleteWallet function");
      console.error(error);
    }
  }

  function handleChange(e) {
    setWalletDetails({
      ...walletDetails,
      name: e.target.value,
    });
  }

  const monthlyCashFlow = transactions?.reduce(
    (acc, curr) => acc + curr.transactionAmount,
    walletDetails.balance
  );

  return (
    <form className="p-2">
      <div className="mb-4">
        <ul className="flex justify-between">
          <li>
            <button onClick={() => navigate(-1)}>Back</button>
          </li>
          <li>
            <h1>Cash Flow: {formatCurrency(monthlyCashFlow)}</h1>
          </li>
          <li>
            <button onClick={deleteWallet}>Delete</button>
          </li>
        </ul>
      </div>
      {walletDetails ? (
        <div>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              value={walletDetails.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="bank">Bank: </label>
            <input
              type="text"
              name="bank"
              value={walletDetails.bank}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="balance">Initial Balance: </label>
            <input
              type="number"
              name="balance"
              value={walletDetails.balance}
              onChange={handleChange}
            />
            {/* <span>{formatCurrency(walletDetails.balance)}</span> */}
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={walletDetails.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <p>Wallet Type</p>
            {walletType != "savings" ? (
              <>
                <label htmlFor="walletType">Default</label>
                <input
                  type="radio"
                  name="walletType"
                  id="type-default"
                  value="default"
                  onChange={handleChange}
                  checked={walletDetails.walletType === "default"}
                />
                <label htmlFor="walletType">Credit</label>
                <input
                  type="radio"
                  name="walletType"
                  id="type-credit"
                  value="credit"
                  onChange={handleChange}
                  checked={walletDetails.walletType === "credit"}
                />
              </>
            ) : (
              <>
                <label htmlFor="walletType">Savings</label>
                <input
                  type="radio"
                  name="walletType"
                  id="type-credit"
                  value="savings"
                  onChange={handleChange}
                  checked={walletDetails.walletType === "savings"}
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
