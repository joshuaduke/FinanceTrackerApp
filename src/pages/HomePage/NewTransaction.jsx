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
  const [categoryToggle, setCategoryToggle] = useState(false);
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
      if (e.target.name == "category") {
        setCategoryToggle(!categoryToggle);
      }
      setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
    } catch (error) {
      console.error(error);
    }
  }

  function handleCategorySelection(value) {
    setNewTransaction({ ...newTransaction, category: value });
    setCategoryToggle(!categoryToggle);
  }

  function handleCategoryToggle(e) {
    e.preventDefault();
    setCategoryToggle(!categoryToggle);
  }

  console.log("Current Category Type", newTransaction.categoryType);
  console.log("Current Category", newTransaction.category);
  console.log("Level 1 Wallet ID", wallet);
  console.log("Level 1 Wallet ID", newTransaction.walletId);
  console.log("New Tranasaction", newTransaction);

  return (
    <div className="p-4">
      {newTransaction && newTransaction.categoryType != "Transfer" ? (
        <form className="" onSubmit={handleSubmit}>
          <ul className="flex justify-between text-text pb-4">
            <li>
              <button onClick={() => navigate(-1)}>Back</button>
            </li>

            <button className="bg-impGreen rounded-md p-2" type="submit">
              Add Transaction
            </button>
          </ul>

          <div className="flex justify-between">
            <CategoryIcon category={newTransaction.category} />
            <div className="self-center  w-1/2 justify-center flex items-center shadow-md">
              <div className="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-6 h-10 text-white ">
                <svg
                  className="h-5 w-5 fill-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 15h2c0 1.08 1.37 2 3 2s3-.92 3-2c0-1.1-1.04-1.5-3.24-2.03C9.64 12.44 7 11.78 7 9c0-1.79 1.47-3.31 3.5-3.82V3h3v2.18C15.53 5.69 17 7.21 17 9h-2c0-1.08-1.37-2-3-2s-3 .92-3 2c0 1.1 1.04 1.5 3.24 2.03C14.36 11.56 17 12.22 17 15c0 1.79-1.47 3.31-3.5 3.82V21h-3v-2.18C8.47 18.31 7 16.79 7 15" />
                </svg>
              </div>

              <div className="w-full">
                <input
                  className="w-full h-10 px-2 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  type="number"
                  step="any"
                  min="0"
                  name="transactionAmount"
                  id="transactionAmount"
                  placeholder="0"
                  value={newTransaction.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Need to be able to get the selection from the walletselection component */}
          <WalletSelection transactionWallet={wallet} setWallet={setWallet} />

          <div id="date-selection" className="flex justify-between my-4">
            <ul>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill=""
                    d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5v-5Z"
                  />
                </svg>
                <span className="ml-2 items-center text-text text-lg">
                  Date
                </span>
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
            <label htmlFor="description" className="block text-text text-lg">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="max-w-full"
              value={newTransaction.description}
              onChange={handleChange}
              cols="120"
              rows="5"
            ></textarea>
          </div>

          <button
            className="p-2 bg-complement1"
            onClick={(e) => handleCategoryToggle(e)}
          >
            Select Category
          </button>

          {categoryToggle && (
            <CategorySelection
              categoryType={newTransaction.categoryType}
              setCategory={handleCategorySelection}
              selectCategoryType={handleChange}
              category={newTransaction.category}
              categoryToggle={categoryToggle}
            />
          )}
        </form>
      ) : (
        <TransferTransaction />
      )}
    </div>
  );
}

export default NewTransaction;
