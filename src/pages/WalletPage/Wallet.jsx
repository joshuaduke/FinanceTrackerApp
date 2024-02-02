import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../Config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { getMonthName } from "../../assets/months";
import { formatCurrency } from "../../assets/currency/formatCurrency";
import { getTransactionsAPI } from "../../assets/api/transaction";

function WalletList(props) {
  const transactionsCollectionRef = collection(db, "transactions");
  const value = props.value;
  const [transactions, setTransactions] = useState([]);

  console.log("value", value);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const q1 = query(
          transactionsCollectionRef,
          where("walletId", "==", value.id)
        );

        getTransactionsAPI(q1).then((value) => setTransactions(value));
      } catch (error) {
        console.error(error);
      }
    };

    getTransactions();
  }, []);

  const monthlyCashFlow = transactions?.reduce(
    (acc, curr) => acc + curr.transactionAmount,
    value.balance
  );

  console.log("Wallet Transactions", transactions);

  return (
    <div className="p-2">
      <Link
        className="flex justify-between"
        to={`/wallet/${value.id}`}
        state={{ walletTransactions: transactions }}
      >
        <div>
          <h3>{value.name}</h3>
          <p>
            {value.bank}
            {value.walletType != "default" ? " - " + value.walletType : false}
          </p>
        </div>
        <div>
          <p>{formatCurrency(monthlyCashFlow)}</p>
        </div>
      </Link>
    </div>
  );
}

export default WalletList;
