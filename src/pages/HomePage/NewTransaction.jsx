import { useNavigate } from "react-router-dom";
import CategoryIcon from "../../components/CategoryIcon";
import { useState } from "react";
import WalletSelection from "../WalletPage/WalletSelection";
import Importance from "../../components/Importance";
import CategorySelection from "../../components/CategorySelection";

function NewTransaction() {
  const navigate = useNavigate();
  const [categoryType, setCategoryType] = useState("expenses");
  const [category, setCategory] = useState("Misc");
  //   const [transactionAmout, setTransactionAmount] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    let data = {
      category: category,
      amount: 0,
      date: "date",
      importance: "very",
      recurrence: "never",
      categoryType: categoryType,
      description: "empty",
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
          <li>Delete</li>
        </ul>

        <div className="flex justify-between">
          <CategoryIcon category={category} />
          <div className="self-center">
            <span>amount</span>

            <input
              className="border-solid border-2"
              type="number"
              placeholder="$500"
              name=""
              id=""
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
            <input type="date" />
          </div>
        </div>

        <Importance />

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
          <input type="text" name="" id="" />
        </div>

        <div id="category-selection">
          <div>
            <h3>Transaction Category</h3>
            <div>
              <span>Icon 1</span>
              <span>Icon 2</span>
            </div>
          </div>

          <div className="grid grid-cols-3 rounded-xl bg-gray-200 p-2">
            <div>
              <label
                htmlFor="expenses"
                className=" cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
              >
                Expenses
              </label>
              <input
                className="peer "
                type="radio"
                name="categoryType"
                id="expenses"
                value="expenses"
                onChange={() => selectCategoryType("expenses")}
                checked={categoryType === "expenses"}
              />
            </div>
            <div>
              <label
                htmlFor="expenses"
                className=" cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
              >
                Income
              </label>
              <input
                className="peer "
                type="radio"
                name="categoryType"
                id="income"
                value="income"
                onChange={() => selectCategoryType("income")}
                checked={categoryType === "income"}
              />
            </div>
            <div>
              <label
                htmlFor="expenses"
                className=" cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
              >
                Transfer
              </label>
              <input
                className="peer "
                type="radio"
                name="categoryType"
                id="transfer"
                value="transfer"
                onChange={() => selectCategoryType("transfer")}
                checked={categoryType === "transfer"}
              />
            </div>
          </div>
        </div>
        <CategorySelection
          categoryType={categoryType}
          setCategory={selectCategory}
        />

        <button className="border-2 p-2" type="submit">
          Add Transaction
        </button>
      </form>
    </>
  );
}

export default NewTransaction;
