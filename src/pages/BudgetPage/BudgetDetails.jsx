import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../../Config/firebase";
import {
  doc,
  getDoc,
  deleteDoc,
  collection,
  updateDoc,
  query,
  where,
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
  const myBudgetUser = state?.user;
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
        const q1 = query(docRef, where("user", "==", myBudgetUser));
        const budgetData = await getDoc(q1);
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

  async function deleteBudget(e) {
    try {
      e.preventDefault();
      let confirmText = "Are you sure you want to delete this savings goal?";

      if (confirm(confirmText) == true) {
        await deleteDoc(docRef);
        navigate("/");
      }
    } catch (error) {
      console.log("Error in deleteSavings function");
      console.error(error);
    }
  }

  console.log("Budget", budget);
  console.log("Budget data:", budgetObj);
  console.log("location State", myBudgetTransactions);
  console.log("total transaction amount", totalTransactionAmount);

  return (
    <main className="p-4">
      <form action="" onSubmit={handleSubmit}>
        <div>
          <ul className="flex justify-between text-text">
            <li className="place-self-center">
              <p onClick={() => navigate(-1)}>Back</p>
            </li>
            <li className="place-self-center">Edit {budgetObj.name}</li>
            <button className="bg-impRed rounded-md p-2" onClick={deleteBudget}>
              Delete
            </button>
          </ul>
        </div>

        <label htmlFor="name" className="text-text text-lg">
          Name:
        </label>
        <input
          className="w-full h-10 px-2 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
          type="text"
          name="name"
          value={budgetObj.name}
          onChange={handleChange}
        />

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
              value={budgetObj.amount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div id="date-selection" className="flex justify-between my-6">
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
                {" "}
                Start Date
              </span>
            </li>
          </ul>
          <div>
            <input
              type="date"
              name="date"
              id="date"
              value={budgetObj.startDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <RecurrenceSelection
          recurrence={budgetObj.recurrence}
          handleChange={handleChange}
        />

        <div onClick={toggleView} className="text-text">
          Budget for{" "}
        </div>
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

        <div className="bg-secondary rounded-md p-2">
          <p className="text-text text-sm">
            <span>You spent ${Math.abs(totalTransactionAmount)}</span> out of $
            {budgetObj.amount}
          </p>

          <div className=" bg-neutral-200 dark:bg-neutral-600 ">
            <ProgressBar percentage={budgetPercentage} />
          </div>
        </div>

        <button className="block py-2 px-10 my-6 text-green-500 bg-green-900 rounded-lg w-fit mx-auto">
          Save Changes
        </button>
      </form>

      <div className="grid grid-cols-2 ">
        <h3 className="text-text text-lg">Current Period</h3>
        <CashFlow transactions={myBudgetTransactions} />
      </div>

      <div className="h-96 overflow-y-scroll ">
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
      </div>
    </main>
  );
}

export default BudgetDetails;
