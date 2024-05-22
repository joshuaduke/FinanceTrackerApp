import Footer from "../../components/footer/footer";
import { useEffect, useState, useContext } from "react";
import Wallet from "./Wallet";
import { Link } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../Config/firebase";
import { getTransactionsAPI } from "../../assets/api/transaction";
import { formatCurrency } from "../../assets/currency/formatCurrency";
import CashFlow from "../../components/CashFlow";
import { Context } from "../../Context/AuthContext";

function WalletPage() {
  const { user } = useContext(Context);
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const walletsCollectionRef = collection(db, "wallets");
  const transactionsCollectionRef = collection(db, "transactions");
  let totalTransactionCashFlow = transactions.reduce(
    (acc, curr) => acc + curr.transactionAmount,
    0
  );

  let totalWalletCashFlow = wallets.reduce(
    (acc, curr) => acc + curr.balance,
    0
  );

  let totalCashFlow = totalTransactionCashFlow + totalWalletCashFlow;

  console.log("ID", transactionsCollectionRef.id);

  useEffect(() => {
    async function getWallets() {
      const q1 = await query(
        walletsCollectionRef,
        where("user", "==", user.uid)
      );
      const data = await getDocs(q1);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setWallets(filteredData);

      //retrieve all transactions in order to calculate wallet total;
      const q2 = query(
        transactionsCollectionRef,
        where("user", "==", user.uid)
      );

      getTransactionsAPI(q2).then((value) => setTransactions(value));
    }

    getWallets();
  }, []);

  console.log("transactions from api", transactions);

  return (
    <div className="p-4">
      <h1 className="text-center text-text">Wallets</h1>
      <CashFlow transactions={transactions} />
      <ul>
        {wallets.map((item) => (
          <Wallet key={item.id} value={item} />
        ))}
      </ul>

      <Link
        to="/wallet/new"
        className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0"
      >
        Create a New Wallet
      </Link>
      <Footer />
    </div>
  );
}

export default WalletPage;
