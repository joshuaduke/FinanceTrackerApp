import Footer from "../../components/footer/footer";
import { useEffect, useState } from "react";
import Wallet from "./Wallet";
import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Config/firebase";

function WalletPage() {
  const [wallets, setWallets] = useState([]);
  const walletsCollectionRef = collection(db, "wallets");

  useEffect(() => {
    async function getWallets() {
      const data = await getDocs(walletsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setWallets(filteredData);
    }

    getWallets();
    // fetch("/api/wallet")
    //   .then((response) => response.json())
    //   .catch((err) => console.log("err", err))
    //   .then((data) => setWallets(data.wallets));
  }, []);

  return (
    <>
      <h1 className="text-center">Wallets</h1>
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
