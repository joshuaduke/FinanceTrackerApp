import CategoryIcon from "../../components/CategoryIcon";
import { Link } from "react-router-dom";
import { db } from "../../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

function Transaction(props) {
  const data = props.value.transactionData;
  const docRef = doc(db, "wallets", data.walletId);
  const [transactionWalletId, setTransactionWalletId] = useState("");

  // console.log("L3 Props", props);

  console.log("L3 Transaction", data);

  useEffect(() => {
    const getWallet = async () => {
      try {
        const walletData = await getDoc(docRef);
        console.log("WalletData", walletData.data());

        setTransactionWalletId(walletData.data());
      } catch (error) {
        console.log("ERROR in getWallet function");
        console.error(error);
      }
    };

    getWallet();
  }, []);

  return (
    <div className="bg-complement2 m-2 rounded-md">
      <Link to={`/transaction/${data.id}`}>
        <div
          className="flex justify-between items-center px-2 py-3"
          id="transaction-item"
        >
          <CategoryIcon className="basis-1/4" category={data.category} />
          <div className="basis-1/2">
            <p>
              {data.category} - {data.description}
            </p>
            <div>
              <p>
                {transactionWalletId.name != null
                  ? transactionWalletId.name
                  : ""}
              </p>
            </div>
          </div>
          <div className="basis-1/4 text-end">
            <p
              className={
                data.transactionAmount < 0 ? "text-red-500" : "text-green-500"
              }
            >
              {data.transactionAmount}$
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Transaction;
