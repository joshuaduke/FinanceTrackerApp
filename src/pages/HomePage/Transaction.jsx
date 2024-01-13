import CategoryIcon from "../../components/CategoryIcon";
import { Link } from "react-router-dom";
import { db } from "../../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";

function Transaction(props) {
  const data = props.value.transactionData;
  const docRef = doc(db, "wallets", "km0HbuyoDbWJdEp9c6J4");
  const [walletId, setWalletId] = useState(null);

  // console.log("L3 Props", props);

  console.log("L3 Transaction", data);

  // function getWallet() {
  //   try {
  //     const walletData = getDoc(docRef);
  //     console.log("WalletData", walletData);

  //     setWalletId(walletData.data());
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // getWallet();
  return (
    <div className="bg-complement2 m-2 rounded-md">
      <Link to={`/transaction/${data.id}`}>
        <div
          className="flex justify-between items-center px-5 py-3"
          id="transaction-item"
        >
          <CategoryIcon className="basis-1/4" category={data.category} />
          <div className="basis-1/2">
            <p>{data.description}</p>
            <p>{data.walletId}</p>
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
