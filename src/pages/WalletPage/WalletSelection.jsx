import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../Config/firebase";

function WalletSelection({ transactionWallet, setWallet }) {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState("1234");
  const [transactionWalletId, setTransactionWalletId] = useState("");
  const walletsCollectionRef = collection(db, "wallets");

  console.log("Initial transaction wallet value", transactionWallet);

  useEffect(() => {
    // fetch("/api/wallet")
    //   .then((response) => response.json())
    //   .catch((err) => console.log("err", err))
    //   .then((data) => setWallets(data.wallets));

    const getWallets = async () => {
      try {
        const data = await getDocs(walletsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setWallets(filteredData);

        const wallet = filteredData.find(({ id }) => id === transactionWallet);

        console.log("Wallet", wallet);
        setSelectedWallet(wallet.name);
      } catch (error) {
        console.error(error);
      }
    };

    getWallets();
  }, []);

  console.log("Wallets", wallets);
  console.log("transactionWallet", selectedWallet);
  console.log("transactionWalletID", transactionWalletId);

  setWallet(transactionWalletId);

  return (
    <div id="wallet-selection" className="flex justify-between">
      <ul>
        <li className="flex">
          <svg
            className="place-self-center "
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 20q-1.65 0-2.825-1.175T2 16V8q0-1.65 1.175-2.825T6 4h12q1.65 0 2.825 1.175T22 8v8q0 1.65-1.175 2.825T18 20H6ZM6 8h12q.55 0 1.05.125t.95.4V8q0-.825-.587-1.412T18 6H6q-.825 0-1.412.588T4 8v.525q.45-.275.95-.4T6 8Zm-1.85 3.25l11.125 2.7q.225.05.45 0t.425-.2l3.475-2.9q-.275-.375-.7-.612T18 10H6q-.65 0-1.137.338t-.713.912Z"
            />
          </svg>
          <span className="ml-5">Wallet</span>
        </li>
      </ul>
      <select
        value={selectedWallet}
        onChange={(e) => {
          let index = e.target.selectedIndex;
          let optionElement = e.target.childNodes[index];
          let option = optionElement.getAttribute("data-id");
          setSelectedWallet(e.target.value);
          setTransactionWalletId(option);
        }}
      >
        <option value="unselected"> -- Select One -- </option>

        {wallets.map((wallet) => (
          <option key={wallet.id} data-id={wallet.id} value={wallet.name}>
            {wallet.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default WalletSelection;
