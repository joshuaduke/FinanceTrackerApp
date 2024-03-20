import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getCurrentDate } from "../../assets/months";

function NewWallet() {
  const navigate = useNavigate();
  const [walletName, setWalletName] = useState("");
  const [walletBank, setWalletBank] = useState("");
  const [walletCurrentBalance, setWalletCurrentBalance] = useState("");
  const [walletType, setWalletType] = useState("default");
  const [walletCreditLimit, setWalletCreditLimit] = useState("");
  const [walletDescription, setWalletDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const walletRef = await addDoc(collection(db, "wallets"), {
      name: walletName,
      bank: walletBank,
      balance: walletCurrentBalance,
      walletType: walletType,
      creditLimit: walletCreditLimit,
      description: walletDescription,
      createdDate: getCurrentDate(),
    });

    navigate("/");
    console.log("Submitted Data", walletRef);
  }

  return (
    <form className="p-2" onSubmit={handleSubmit}>
      <div className="mb-4">
        <ul className="flex justify-between">
          <li>
            <p onClick={() => navigate(-1)}>Back</p>
          </li>
        </ul>
      </div>

      <div>
        <div>
          <label htmlFor="wallet-name">Name: </label>
          <input
            type="text"
            name="wallet-name"
            value={walletName}
            onChange={(e) => setWalletName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="">Bank: </label>
          <input
            type="text"
            value={walletBank}
            onChange={(e) => setWalletBank(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="wallet-current-balance">Initial Balance: $</label>
          <input
            type="number"
            name="wallet-current-balance"
            value={walletCurrentBalance}
            onChange={(e) => setWalletCurrentBalance(e.target.value)}
          />
        </div>

        <div>
          <p>Wallet Type</p>
          <label htmlFor="wallet-type">Default</label>
          <input
            type="radio"
            name="wallet-type"
            id="type-default"
            value="default"
            onChange={(e) => setWalletType(e.target.value)}
            checked={walletType === "default"}
            required
          />
          <label htmlFor="wallet-type">Credit</label>
          <input
            type="radio"
            name="wallet-type"
            id="type-credit"
            value="credit"
            onChange={(e) => setWalletType(e.target.value)}
            checked={walletType === "credit"}
          />
          <label htmlFor="wallet-type">Savings</label>
          <input
            type="radio"
            name="wallet-type"
            id="type-savings"
            value="savings"
            onChange={() =>
              navigate("/savings/new", {
                state: {
                  id: "savingsFromWallet",
                  walletName: walletName,
                  walletBank: walletBank,
                  walletCurrentBalance: walletCurrentBalance,
                  walletType: "savings",
                  walletDescription: walletDescription,
                },
              })
            }
            checked={walletType === "savings"}
          />
          <br />

          {walletType === "credit" && (
            <>
              <label htmlFor="wallet-credit-limit">
                What is the credit limit for this wallet?:
              </label>
              <input
                type="number"
                name="wallet-credit-limit"
                value={walletCreditLimit}
                onChange={(e) => setWalletCreditLimit(e.target.value)}
              />
            </>
          )}
        </div>

        <div>
          <label htmlFor="wallet-description">Description</label>
          <textarea
            name="wallet-description"
            value={walletDescription}
            onChange={(e) => setWalletDescription(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0"
        >
          Create New Wallet
        </button>
      </div>
    </form>
  );
}

export default NewWallet;
