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

  async function handleSubmit(e) {
    console.log("Submitting");
    e.preventDefault();
    const transactionRef = await addDoc(collection(db, "budgets"), {
      name: budgetName,
      amount: parseInt(budgetAmount),
      startDate: budgetStartDate,
      budgetFor: budgetCategories,
      recurrence: recurrence,
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
          name="budgetName"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="budgetAmount">Amount</label>
        <input
          type="number"
          name="budgetAmount"
          id="budgetAmount"
          value={budgetAmount}
          onChange={(e) => setBudgetAmount(e.target.value)}
          required
        />

        {showCategories ? (
          myIcons.map((icon) => (
            <div key={icon.id} className="flex bg-yellow-300">
              <CategoryCheckbox
                isChecked={icon.checked}
                name={icon.name}
                checkHandler={updateCheckStatus}
                budgetCategories={budgetCategories}
                setBudgetCategories={setBudgetCategories}
              />
            </div>
          ))
        ) : (
          <p>...loading</p>
        )}

        <div onClick={toggleView}>Budget for </div>
        <RecurrenceSelection
          recurrence={recurrence}
          setRecurrence={setRecurrence}
        />
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={budgetStartDate}
          onChange={(e) => setBudgetStartDate(e.target.value)}
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
