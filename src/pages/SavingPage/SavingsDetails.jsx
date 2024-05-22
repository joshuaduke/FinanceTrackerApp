import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getTransactionsAPI } from "../../assets/api/transaction";
import { db } from "../../Config/firebase";
import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import ProgressBar from "../../components/ProgressBar";

function SavingsDetails() {
  const navigate = useNavigate();
  let location = useLocation();
  const param = useParams();
  const transactionsCollectionRef = collection(db, "transactions");
  const docRef = doc(db, "savings", param.id);
  location = location.state;
  const [goal, setGoal] = useState({
    amount: location.savingsAmount,
    category: location.savingsData.category,
    dueDate: location.savingsData.dueDate,
    goal: location.savingsData.goal,
    name: location.savingsData.name,
    description: location.savingsData.description,
    user: location.savingsData.user,
  });
  const [savingsTransactions, setSavingsTransactions] = useState([]);

  const goalPercentage = Math.ceil((goal.amount / goal.goal) * 100);
  useEffect(() => {
    const q1 = query(
      transactionsCollectionRef,
      where("toWalletId", "==", location.savingsData.walletId),
      where("user", "==", location.savingsData.user)
    );

    getTransactionsAPI(q1).then((result) => setSavingsTransactions(result));
  }, []);

  function handleChange(e) {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  }

  async function deleteSavings(e) {
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
  console.log("savingsTransactions", savingsTransactions);
  return (
    <main className="p-4">
      <form action="">
        <div>
          <ul className="flex justify-between text-text">
            <li className="place-self-center">
              <p onClick={() => navigate(-1)}>Back</p>
            </li>
            <li className="place-self-center">{goal.name}</li>
            <li>
              <button
                className="bg-impRed rounded-md p-2"
                onClick={deleteSavings}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>

        <label htmlFor="name" className="text-text text-lg">
          Name:{" "}
        </label>
        <input
          className="w-full h-10 px-2 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
          type="text"
          name="name"
          value={goal.name}
          onChange={handleChange}
        />

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
              <span className="ml-2 items-center text-text text-lg">Date</span>
            </li>
          </ul>
          <div>
            <input
              type="date"
              name="date"
              id="date"
              value={goal.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-between my-6">
          <label
            htmlFor="amount"
            className="place-self-center text-text text-lg"
          >
            Goal Amount
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
              name="goal"
              type="number"
              value={goal.goal}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="bg-secondary rounded-md p-2">
          <p className="text-text text-sm">
            <span>You saved ${goal.amount}</span> saved out of ${goal.goal}
          </p>

          <div className=" bg-neutral-200 dark:bg-neutral-600 ">
            <ProgressBar percentage={goalPercentage} />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-text text-lg">
            Description
          </label>
          <textarea
            name="description"
            id=""
            className="max-w-full"
            cols="120"
            rows="5"
            value={goal.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0">
          Save Changes
        </button>
      </form>
    </main>
  );
}

export default SavingsDetails;
