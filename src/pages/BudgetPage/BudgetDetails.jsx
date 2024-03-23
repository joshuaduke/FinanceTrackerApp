import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../../Config/firebase";
import {
  doc,
  getDoc,
  deleteDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { getCurrentDate, getStartEndDate } from "../../assets/months";
import RecurrenceSelection from "../../components/RecurrenceSelection";
import ProgressBar from "../../components/ProgressBar";
import TransactionDate from "../HomePage/TransactionDate";
import { sortTransactionsByDate } from "../../assets/api/transaction";
import { myIcons } from "../../assets/myIcons";
import CategoryCheckbox from "../../components/CategoryCheckbox";
import CashFlow from "../../components/CashFlow";

function BudgetDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const myBudgetTransactions = state?.transactions;
  const transactionDates = sortTransactionsByDate(myBudgetTransactions);
  const totalTransactionAmount = myBudgetTransactions.reduce(
    (acc, curr) => acc + curr.transactionAmount,
    0
  );
  const budgetId = params.id;
  const [budget, setBudget] = useState();
  const [budgetObj, setBudgetObj] = useState({
    name: "",
    amount: 0,
    budgetFor: [],
    recurrence: "never",
    startDate: getCurrentDate(),
  });
  const [showCategories, setShowCategories] = useState(false);
  const [budgetCategories, setBudgetCategories] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const budgetPercentage =
    (Math.abs(totalTransactionAmount) / budgetObj.amount) * 100;
  const docRef = doc(db, "budgets", params.id);
  console.log("Params", params);

  useEffect(() => {
    const getBudget = async () => {
      try {
        const budgetData = await getDoc(docRef);
        console.log("One item Data", budgetData.data());
        setBudget(budgetData.data());
        setBudgetObj((prevState) => ({
          ...prevState,
          name: budgetData.data().name,
          amount: budgetData.data().amount,
          recurrence: budgetData.data().recurrence,
          budgetFor: budgetData.data().budgetFor,
          startDate: budgetData.data().startDate,
        }));
        setBudgetCategories(budgetData.data().budgetFor);
      } catch (error) {
        console.error(error);
      }
    };

    getBudget();
  }, []);

  function handleChange(e) {
    setBudgetObj({ ...budgetObj, [e.target.name]: e.target.value });
  }

  function toggleView() {
    setShowCategories(!showCategories);
  }

  function updateCheckStatus() {
    setIsChecked(!isChecked);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let confirmaText = "Are you sure you want to update this budget?";
      if (confirm(confirmaText) == true) {
        await updateDoc(doc(db, "budgets", budgetId), {
          name: budgetObj.name,
          amount: budgetObj.amount,
          budgetFor: budgetCategories,
          recurrence: budgetObj.recurrence,
          startDate: budgetObj.startDate,
        });
        navigate("/budget");
      }
    } catch (error) {
      console.error("Budget Details, error in handle submit", error);
    }
  }

  console.log("Budget", budget);
  console.log("Budget data:", budgetObj);
  console.log("location State", myBudgetTransactions);
  console.log("total transaction amount", totalTransactionAmount);

  return (
    <>
      <div>
        <ul className="grid grid-cols-3">
          <li>
            <p onClick={() => navigate(-1)}>Back</p>
          </li>
          <li>Edit {budgetObj.name}</li>
          <li className="text-right">Delete</li>
        </ul>
      </div>

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={budgetObj.name}
          onChange={handleChange}
        />

        <label htmlFor="amount">Budget Amount:</label>
        <input
          type="number"
          name="amount"
          value={budgetObj.amount}
          onChange={handleChange}
        />

        <RecurrenceSelection
          recurrence={budgetObj.recurrence}
          handleChange={handleChange}
        />

        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={budgetObj.startDate}
          onChange={handleChange}
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

        <ProgressBar percentage={budgetPercentage} />

        <button className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0">
          Save Changes
        </button>
      </form>

      <div>
        <h3>Current Period</h3>
        <CashFlow transactions={myBudgetTransactions} />
      </div>

      {myBudgetTransactions ? (
        transactionDates.map((date, index) => (
          <TransactionDate
            key={index}
            date={date}
            transactions={myBudgetTransactions}
          />
        ))
      ) : (
        <p>No Transactions</p>
      )}
    </>
  );
}

export default BudgetDetails;
