import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../Config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { getMonthName } from "../../assets/months";
import { formatCurrency } from "../../assets/currency/formatCurrency";
import { getTransactionsAPI } from "../../assets/api/transaction";
import LoadingIcon from "../../components/loadingIcon";

function WalletList(props) {
  const transactionsCollectionRef = collection(db, "transactions");
  const value = props.value;
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("value", value);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const q1 = query(
          transactionsCollectionRef,
          where("walletId", "==", value.id)
        );

        getTransactionsAPI(q1).then((value) => setTransactions(value));
        setIsLoading(false);
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
    <div className="bg-secondary px-4 my-2 rounded-md text-text">
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <Link
          className="flex justify-between"
          to={`/wallet/${value.id}`}
          state={{ walletTransactions: transactions }}
        >
          <div className="justify-between items-center px-2 py-3">
            <h3 className="text-lg">{value.name}</h3>
            <p>
              {value.bank}
              {value.walletType != "default" ? " - " + value.walletType : false}
            </p>
          </div>
          <div className="place-self-center">
            <p
              className={
                monthlyCashFlow < 0 ? "text-red-500" : "text-green-500"
              }
            >
              {formatCurrency(monthlyCashFlow)}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
}

export default WalletList;
