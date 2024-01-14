import { useNavigate } from "react-router-dom";
import CategoryIcon from "../../components/CategoryIcon";
import { useState } from "react";
import WalletSelection from "../WalletPage/WalletSelection";
import ImportanceSelection from "../../components/ImportanceSelection";
import CategorySelection from "../../components/CategorySelection";
import RecurrenceSelection from "../../components/RecurrenceSelection";
import { db } from "../../Config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getCurrentDate } from "../../assets/months";

function NewTransaction() {
  const navigate = useNavigate();
  const [categoryType, setCategoryType] = useState("expenses");
  const [category, setCategory] = useState("Misc");
  const [wallet, setWallet] = useState("");
  const [date, setDate] = useState(getCurrentDate);
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("");
  const [recurrence, setRecurrence] = useState("never");
  const [amount, setAmount] = useState("");

  //   const [transactionAmout, setTransactionAmount] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    const transactionRef = await addDoc(collection(db, "transactions"), {
      category: category,
      transactionAmount: parseInt(amount),
      date: date,
      importance: importance,
      recurrence: recurrence,
      categoryType: categoryType,
      description: description,
      walletId: wallet,
      createdDate: date,
    });
    // let data = {
    //   category: category,
    //   amount: amount,
    //   date: date,
    //   importance: importance,
    //   recurrence: recurrence,
    //   categoryType: categoryType,
    //   description: description,
    //   wallet: wallet,
    // };
    navigate("/");
    console.log("Submitted Data", transactionRef);
  }

  // useEffect(
  //     fetch()
  // ,([]))
  // import wallet options from api

  function selectCategoryType(value) {
    setCategoryType(value);

    console.log(categoryType);
  }

  function selectCategory(value) {
    setCategory(value);
  }

  console.log("Current Category", categoryType);

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <ul className="flex justify-between">
          <li>
            <button onClick={() => navigate(-1)}>Back</button>
          </li>
          <li>Add Transaction</li>
        </ul>

        <div className="flex justify-between">
          <CategoryIcon category={category} />
          <div className="self-center">
            <span>amount $</span>

            <input
              className="border-solid border-2"
              type="number"
              name="transaction-amount"
              id="transaction-amount"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Need to be able to get the selection from the walletselection component */}
        <WalletSelection transactionWallet={""} setWallet={setWallet} />

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
              name="transaction-date"
              id="transaction-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <ImportanceSelection
          importance={importance}
          selectTransactionImportance={setImportance}
        />

        <RecurrenceSelection
          recurrence={recurrence}
          setRecurrence={setRecurrence}
        />

        <div>
          <label htmlFor="">Description</label>
          <input
            type="text"
            name="transaction-description"
            id="transaction-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <CategorySelection
          categoryType={categoryType}
          setCategory={selectCategory}
          selectCategoryType={selectCategoryType}
          category={category}
        />

        <button className="border-2 p-2" type="submit">
          Add Transaction
        </button>
      </form>
    </>
  );
}

export default NewTransaction;
