import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../Config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { getMonthName } from "../../assets/months";
import { formatCurrency } from "../../assets/currency/formatCurrency";
function WalletList(props) {
  const transactionsCollectionRef = collection(db, "transactions");
  const value = props.value;
  const [transactions, setTransactions] = useState([]);
  let totalBalance = transactions.reduce(
    (acc, curr) => acc + curr.transactionAmount,
    0
  );
  console.log("value", value);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        // console.log(`UseEffect Start ${startDate}, end ${EndDate}`);
        const q1 = await query(
          transactionsCollectionRef,
          where("walletId", "==", value.id)
        );

        const data = await getDocs(q1);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setTransactions(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    getTransactions();
  }, []);

  console.log("Wallet Transactions", transactions);

  return (
    <div className="p-2">
      <Link className="flex justify-between" to={`/wallet/${value.id}`}>
        <div>
          <h3>{value.name}</h3>
          <p>{value.bank}</p>
        </div>
        <div>
          <p>{formatCurrency(totalBalance)}</p>
        </div>
      </Link>
    </div>
  );
}

export default WalletList;
