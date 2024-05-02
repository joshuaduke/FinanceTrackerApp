import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getCurrentDate } from "../../assets/months";
import { Context } from "../../Context/AuthContext";

function NewWallet() {
  const navigate = useNavigate();
  const { user } = useContext(Context);
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
      balance: walletCurrentBalance == "" ? 0 : walletCurrentBalance,
      walletType: walletType,
      creditLimit: walletCreditLimit,
      description: walletDescription,
      user: user.uid,
      createdDate: getCurrentDate(),
    });

    navigate("/");
    console.log("Submitted Data", walletRef);
  }

  return (
    <main className="p-4 flex flex-col min-h-screen">
      <div className="mb-4 text-text">
        <ul className="flex justify-between">
          <li>
            <p onClick={() => navigate(-1)}>Back</p>
          </li>
        </ul>
      </div>
      <form className="p-2 flex flex-col grow " onSubmit={handleSubmit}>
        <div className="grow">
          <div className="flex justify-between my-6">
            <label htmlFor="wallet-name" className="text-text text-lg">
              Name:{" "}
            </label>
            <input
              className="w-fit h-10 px-2 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
              type="text"
              name="wallet-name"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between my-6">
            <label htmlFor="" className="text-text text-lg">
              Bank:{" "}
            </label>
            <input
              className="w-fit h-10 px-2 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
              type="text"
              value={walletBank}
              onChange={(e) => setWalletBank(e.target.value)}
            />
          </div>

          <div className="flex justify-between my-6">
            <label
              htmlFor="wallet-current-balance"
              className="text-text text-lg"
            >
              Initial Balance: $
            </label>
            <input
              className="w-fit h-10 px-2 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
              type="number"
              name="wallet-current-balance"
              value={walletCurrentBalance}
              onChange={(e) => setWalletCurrentBalance(e.target.value)}
            />
          </div>

          <div className=" my-6 text-text">
            <p className=" text-lg my-4">Wallet Type</p>
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
              <div className="flex justify-between my-6">
                <label htmlFor="wallet-credit-limit">Credit Limit</label>
                <input
                  type="number"
                  name="wallet-credit-limit"
                  className="w-fit h-10 px-2 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
                  value={walletCreditLimit}
                  onChange={(e) => setWalletCreditLimit(e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="wallet-description" className="text-text text-lg">
              Description
            </label>
            <textarea
              name="wallet-description"
              className="max-w-full rounded-md p-2"
              cols="120"
              rows="5"
              value={walletDescription}
              onChange={(e) => setWalletDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="h-14 ">
          <button
            type="submit"
            className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0"
          >
            Create New Wallet
          </button>
        </div>
      </form>
    </main>
  );
}

export default NewWallet;
