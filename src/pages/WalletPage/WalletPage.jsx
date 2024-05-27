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

      <Link className="fixed bottom-24 right-5 mb-5" to="/wallet/new">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          className="shadow-sm shadow-impGreen rounded-xl bg-success"
        >
          <path
            className="fill-success "
            d="M16 2A14.173 14.173 0 0 0 2 16a14.173 14.173 0 0 0 14 14a14.173 14.173 0 0 0 14-14A14.173 14.173 0 0 0 16 2Zm8 15h-7v7h-2v-7H8v-2h7V8h2v7h7Z"
          />
          <path fill="white" d="M24 17h-7v7h-2v-7H8v-2h7V8h2v7h7v2z" />
        </svg>
      </Link>

      <Footer />
    </div>
  );
}

export default WalletPage;
