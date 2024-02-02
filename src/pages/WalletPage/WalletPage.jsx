import Footer from "../../components/footer/footer";
import { useEffect, useState } from "react";
import Wallet from "./Wallet";
import { Link } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../Config/firebase";
import { getTransactionsAPI } from "../../assets/api/transaction";
import { formatCurrency } from "../../assets/currency/formatCurrency";

function WalletPage() {
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
      const data = await getDocs(walletsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setWallets(filteredData);

      //retrieve all transactions in order to calculate wallet total;
      getTransactionsAPI(transactionsCollectionRef).then((value) =>
        setTransactions(value)
      );
    }

    getWallets();
  }, []);

  console.log("transactions from api", transactions);

  return (
    <>
      <h1 className="text-center">Wallets</h1>
      <h2>Total Cash Flow: {formatCurrency(totalCashFlow)}</h2>
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
    </>
  );
}

export default WalletPage;
