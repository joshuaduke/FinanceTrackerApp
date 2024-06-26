import { useEffect, useState, useContext } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../Config/firebase";
import { Context } from "../../Context/AuthContext";
import InformationModal from "../../components/InformationModal.jsx";

function WalletSelection({ transactionWallet, setWallet }) {
  const { user } = useContext(Context);
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState("");
  const [transactionWalletId, setTransactionWalletId] = useState("");
  const walletsCollectionRef = collection(db, "wallets");
  const [showInfoModal, setShowInfoModal] = useState(false);

  console.log("Initial transaction wallet value", transactionWallet);

  useEffect(() => {
    // fetch("/api/wallet")
    //   .then((response) => response.json())
    //   .catch((err) => console.log("err", err))
    //   .then((data) => setWallets(data.wallets));

    const getWallets = async () => {
      try {
        const q1 = await query(
          walletsCollectionRef,
          where("user", "==", user.uid)
        );
        const data = await getDocs(q1);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log("FILTERED DATA", filteredData);

        if (filteredData.length == 0) {
          setShowInfoModal(true);
        } else {
          setShowInfoModal(false);
          setWallets(filteredData);

          if (transactionWallet != "") {
            const wallet = filteredData.find(
              ({ id }) => id === transactionWallet
            );

            console.log("Wallet", wallet);
            setSelectedWallet(wallet.name);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getWallets();
  }, []);

  console.log("Wallets", wallets);
  console.log("transactionWallet", transactionWallet);
  console.log("transactionWalletID", transactionWalletId);

  // setWallet(transactionWalletId);

  return (
    <div id="wallet-selection" className="flex justify-between my-4">
      {showInfoModal && <InformationModal />}
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
              fill=""
              d="M6 20q-1.65 0-2.825-1.175T2 16V8q0-1.65 1.175-2.825T6 4h12q1.65 0 2.825 1.175T22 8v8q0 1.65-1.175 2.825T18 20H6ZM6 8h12q.55 0 1.05.125t.95.4V8q0-.825-.587-1.412T18 6H6q-.825 0-1.412.588T4 8v.525q.45-.275.95-.4T6 8Zm-1.85 3.25l11.125 2.7q.225.05.45 0t.425-.2l3.475-2.9q-.275-.375-.7-.612T18 10H6q-.65 0-1.137.338t-.713.912Z"
            />
          </svg>
          <span className="ml-2 items-center text-text text-lg">Wallet</span>
        </li>
      </ul>
      <div>
        <select
          className="block w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          value={selectedWallet}
          onChange={(e) => {
            let index = e.target.selectedIndex;
            let optionElement = e.target.childNodes[index];
            let option = optionElement.getAttribute("data-id");
            setSelectedWallet(e.target.value);
            setWallet(option);
          }}
          required
        >
          <option value=""> -- Select One -- </option>

          {wallets.map((wallet) => (
            <option key={wallet.id} data-id={wallet.id} value={wallet.name}>
              {wallet.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default WalletSelection;
