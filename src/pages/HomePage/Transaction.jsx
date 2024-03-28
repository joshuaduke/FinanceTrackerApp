import CategoryIcon from "../../components/CategoryIcon";
import { Link } from "react-router-dom";
import { db } from "../../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { formatCurrency } from "../../assets/currency/formatCurrency";

function Transaction(props) {
  const data = props.value.transactionData;
  const docRef = doc(db, "wallets", data.walletId);
  let transferWalletId = "";
  let docRef2 = "";

  if (data.toWalletId != undefined) {
    transferWalletId = data.toWalletId;
    docRef2 = doc(db, "wallets", transferWalletId);
  }

  const [transactionWalletId, setTransactionWalletId] = useState("");
  const [transactionToWalletId, setTransactionToWalletId] = useState("");

  // console.log("L3 Props", props);

  console.log("L3 Transaction", data);

  useEffect(() => {
    const getWallet = async () => {
      try {
        const walletData = await getDoc(docRef);
        let transferWalletData;

        if (docRef2 != "") {
          transferWalletData = await getDoc(docRef2);
          setTransactionToWalletId(transferWalletData.data());
        }

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
    <div className="bg-complement2  px-2 my-2 rounded-md">
      <Link to={`/transaction/${data.id}`}>
        <div
          className="flex justify-between items-center px-2 py-3"
          id="transaction-item"
        >
          <div className="flex-initial pr-2">
            <CategoryIcon category={data.category} />
          </div>
          <div className="flex-auto">
            <p>
              {data.category === "TransferRemoved" ? "Transfer" : data.category}
              {data.description != ""
                ? ` - ${data.description.substring(0, 16)}`
                : ""}
            </p>
            <div>
              {data.categoryType != "Transfer" ? (
                <p className="text-xs">
                  {transactionWalletId.name != null
                    ? transactionWalletId.name
                    : ""}
                </p>
              ) : (
                <>
                  <p className="text-xs">To: {transactionToWalletId.name}</p>
                  <p className="text-xs">From: {transactionWalletId.name}</p>
                </>
              )}
            </div>
          </div>
          <div className="flex-initial text-end">
            <p
              className={
                data.transactionAmount < 0 ? "text-red-500" : "text-green-500"
              }
            >
              {formatCurrency(data.transactionAmount)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Transaction;
