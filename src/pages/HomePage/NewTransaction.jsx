import { useNavigate } from "react-router-dom";
import CategoryIcon from "../../components/CategoryIcon";
import { useState } from "react";
import WalletSelection from "../WalletPage/WalletSelection";
import ImportanceSelection from "../../components/ImportanceSelection";
import CategorySelection from "../../components/CategorySelection";

function NewTransaction() {
  const navigate = useNavigate();
  const [categoryType, setCategoryType] = useState("expenses");
  const [category, setCategory] = useState("Misc");
  const [wallet, setWallet] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [amount, setAmount] = useState("");

  //   const [transactionAmout, setTransactionAmount] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    let data = {
      category: category,
      amount: amount,
      date: date,
      importance: importance,
      recurrence: recurrence,
      categoryType: categoryType,
      description: description,
      wallet: wallet,
    };

    console.log("Submitted Data", data);
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
      <form className="p-6" onSubmit={handleSubmit}>
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
            />
          </div>
        </div>

        {/* Need to be able to get the selection from the walletselection component */}
        <WalletSelection />

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

        <ImportanceSelection />

        <div id="recurrence-selection" className="flex justify-between">
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
              <span className="ml-5">Recurrence</span>
            </li>
          </ul>
          <div>
            <select name="" id="">
              <option value="never">Never</option>
              <option value="monthly">monthly</option>
              <option value="biweekly">biweekly</option>
              <option value="yearly">yearly</option>
            </select>
          </div>
        </div>

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
        />

        <button className="border-2 p-2" type="submit">
          Add Transaction
        </button>
      </form>
    </>
  );
}

export default NewTransaction;
