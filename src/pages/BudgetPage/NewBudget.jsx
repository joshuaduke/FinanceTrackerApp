import { useContext, useState } from "react";
import { myIcons } from "../../assets/myIcons";
import CategoryCheckbox from "../../components/CategoryCheckbox";
import RecurrenceSelection from "../../components/RecurrenceSelection";
import { getCurrentDate } from "../../assets/months";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../Config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Context } from "../../Context/AuthContext";

function NewBudget() {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [newBudgetObj, setNewBudgetObj] = useState({
    amount: 0,
    name: "",
    recurrence: "",
    description: "",
    startDate: getCurrentDate(),
    createdDate: getCurrentDate(),
    user: user.uid,
  });

  const [budgetCategories, setBudgetCategories] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [recurrence, setRecurrence] = useState("never");
  const [budgetStartDate, setBudgetStartDate] = useState(getCurrentDate);

  function updateCheckStatus() {
    setIsChecked(!isChecked);
  }

  function toggleView() {
    setShowCategories(!showCategories);
  }
  /**
   * Name
   * Amount
   * Budget for which categories, array
   * start date
   * recurrence
   */

  function handleChange(e) {
    setNewBudgetObj({ ...newBudgetObj, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    console.log("Submitting");
    e.preventDefault();
    const transactionRef = await addDoc(collection(db, "budgets"), {
      ...newBudgetObj,
      amount: parseFloat(newBudgetObj.amount),
      budgetFor: budgetCategories,
      createdDate: getCurrentDate(),
    });

    navigate("/");
    console.log("Submitted Data", transactionRef);

    console.log(budgetCategories);
  }

  console.log("budgetCategories", budgetCategories);
  return (
    <main className="p-4">
      <div className="text-text">
        <ul className="grid grid-cols-3">
          <li className="">
            <Link to="/goals">back</Link>
          </li>
          <li>Add New Budget</li>
          <li className="text-right"></li>
        </ul>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="budgetName" className="text-text text-lg">
          Budget Name
        </label>
        <input
          type="text"
          name="name"
          value={newBudgetObj.name}
          onChange={handleChange}
          required
        />
        <br />

        <div className="flex justify-between my-6">
          <label
            htmlFor="amount"
            className="place-self-center text-text text-lg"
          >
            Budget Amount
          </label>
          <div className="self-center  w-fit justify-center flex items-center shadow-md">
            <div className="flex w-6 items-center bg-gray-100 rounded-l-md border border-white justify-center h-10 text-white ">
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
            <input
              className="w-fit h-10 px-2 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
              type="number"
              name="amount"
              value={newBudgetObj.amount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div onClick={toggleView}>Budget for </div>
        {showCategories ? (
          myIcons.map((icon) => (
            <div key={icon.id} className="flex bg-yellow-300">
              <CategoryCheckbox
                isChecked={icon.checked}
                name={icon.name}
                type={icon.type}
                checkHandler={updateCheckStatus}
                budgetCategories={budgetCategories}
                setBudgetCategories={setBudgetCategories}
              />
            </div>
          ))
        ) : (
          <p>...loading</p>
        )}

        {/* Recurrence should be required for budget */}
        <RecurrenceSelection
          recurrence={newBudgetObj.recurrence}
          handleChange={handleChange}
        />
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={newBudgetObj.startDate}
          onChange={handleChange}
        />

        <button
          className="block bg-yellow-300 my-0 mx-auto py-2 px-10"
          type="submit"
        >
          Create a New Budget
        </button>
      </form>
    </main>
  );
}

export default NewBudget;
