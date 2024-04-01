import { useNavigate } from "react-router-dom";
import CategoryIcon from "../../components/CategoryIcon";
import { useContext, useState } from "react";
import WalletSelection from "../WalletPage/WalletSelection";
import ImportanceSelection from "../../components/ImportanceSelection";
import CategorySelection from "../../components/CategorySelection";
import RecurrenceSelection from "../../components/RecurrenceSelection";
import { db } from "../../Config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getCurrentDate } from "../../assets/months";
import TransferTransaction from "./TransferTransaction";
import { Context } from "../../Context/AuthContext";

function NewTransaction() {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [wallet, setWallet] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    category: "Misc",
    categoryType: "expenses",
    date: getCurrentDate(),
    importance: "",
    recurrence: "",
    transactionAmount: "",
    description: "",
    walletId: "",
    user: user.uid,
    createdDate: getCurrentDate(),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Submit Wallet", wallet);
    setNewTransaction({ ...newTransaction, walletId: wallet });

    const transactionRef = await addDoc(collection(db, "transactions"), {
      ...newTransaction,
      transactionAmount:
        newTransaction.categoryType == "expenses"
          ? parseFloat(newTransaction.transactionAmount * -1)
          : parseFloat(newTransaction.transactionAmount),
      walletId: wallet,
    });

    navigate("/");
    console.log("Submitted Data", transactionRef);
  }

  function handleChange(e) {
    try {
      console.log("handlechange", e.target);
      setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
    } catch (error) {
      console.error(error);
    }
  }

  console.log("Current Category Type", newTransaction.categoryType);
  console.log("Current Category", newTransaction.category);
  console.log("Level 1 Wallet ID", wallet);
  console.log("Level 1 Wallet ID", newTransaction.walletId);
  console.log("New Tranasaction", newTransaction);

  return (
    <>
      {newTransaction && newTransaction.categoryType != "Transfer" ? (
        <form className="" onSubmit={handleSubmit}>
          <ul className="flex justify-between">
            <li>
              <button onClick={() => navigate(-1)}>Back</button>
            </li>

            <button className="border-2 p-2" type="submit">
              Add Transaction
            </button>
          </ul>

          <div className="flex justify-between">
            <CategoryIcon category={newTransaction.category} />
            <div className="self-center">
              <span>amount $</span>

              <input
                className="border-solid border-2"
                type="number"
                step="any"
                name="transactionAmount"
                id="transactionAmount"
                placeholder="0"
                value={newTransaction.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Need to be able to get the selection from the walletselection component */}
          <WalletSelection transactionWallet={wallet} setWallet={setWallet} />

          <div id="date-selection" className="flex justify-between">
            <ul>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5v-5Z"
                  />
                </svg>
                <span className="ml-5">Date</span>
              </li>
            </ul>
            <div>
              <input
                type="date"
                name="date"
                id="date"
                value={newTransaction.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <ImportanceSelection
            importance={newTransaction.importance}
            handleChange={handleChange}
          />

          <RecurrenceSelection
            recurrence={newTransaction.recurrence}
            handleChange={handleChange}
          />

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={newTransaction.description}
              onChange={handleChange}
              cols="30"
              rows="10"
            ></textarea>
            {/* <input
              type="text"
              name="description"
              id="description"
              value={newTransaction.description}
              onChange={handleChange}
            /> */}
          </div>

          <CategorySelection
            categoryType={newTransaction.categoryType}
            setCategory={handleChange}
            selectCategoryType={handleChange}
            category={newTransaction.category}
          />
        </form>
      ) : (
        <TransferTransaction />
      )}
    </>
  );
}

export default NewTransaction;
