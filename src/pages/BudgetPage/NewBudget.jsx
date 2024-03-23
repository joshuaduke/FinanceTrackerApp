import { useState } from "react";
import { myIcons } from "../../assets/myIcons";
import CategoryCheckbox from "../../components/CategoryCheckbox";
import RecurrenceSelection from "../../components/RecurrenceSelection";
import { getCurrentDate } from "../../assets/months";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../Config/firebase";
import { addDoc, collection } from "firebase/firestore";

function NewBudget() {
  const navigate = useNavigate();
  const [newBudgetObj, setNewBudgetObj] = useState({
    amount: 0,
    name: "",
    recurrence: "",
    startDate: getCurrentDate(),
    createdDate: getCurrentDate(),
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
    <div>
      <div>
        <ul className="grid grid-cols-3">
          <li>
            <Link to="/goals">Close</Link>
          </li>
          <li>Add New Budget</li>
          <li className="text-right">Delete</li>
        </ul>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="budgetName">Budget Name</label>
        <input
          type="text"
          name="name"
          value={newBudgetObj.name}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="budgetAmount">Amount</label>
        <input
          type="number"
          name="amount"
          id="budgetAmount"
          value={newBudgetObj.amount}
          onChange={handleChange}
          required
        />

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
    </div>
  );
}

export default NewBudget;
