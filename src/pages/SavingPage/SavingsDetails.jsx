import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getTransactionsAPI } from "../../assets/api/transaction";
import { db } from "../../Config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

function SavingsDetails() {
  let location = useLocation();
  const param = useParams();
  const transactionsCollectionRef = collection(db, "transactions");
  console.log("Savings details location", location);
  location = location.state.savingsData;
  const [goal, setGoal] = useState({
    amount: location.amount,
    category: location.category,
    dueDate: location.dueDate,
    goal: location.goal,
    name: location.name,
    description: location.description,
  });
  const [savingsTransactions, setSavingsTransactions] = useState([]);

  const goalPercentage = (goal.amount / goal.goal) * 100;
  useEffect(() => {
    const q1 = query(
      transactionsCollectionRef,
      where("toWalletId", "==", location.walletId)
    );

    getTransactionsAPI(q1).then((result) => setSavingsTransactions(result));
  }, []);

  function handleChange(e) {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  }
  console.log("savingsTransactions", savingsTransactions);
  return (
    <>
      <div>
        <ul className="flex justify-between">
          <li>Back</li>
          <li>{goal.name}</li>
          <li>Delete</li>
        </ul>
      </div>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        name="name"
        value={goal.name}
        onChange={handleChange}
      />

      <div>
        <label htmlFor="amount">Goal Amount </label>
        <input
          name="amount"
          type="number"
          value={goal.goal}
          onChange={handleChange}
        />
      </div>

      <p>
        <span>You saved ${goal.amount}</span> saved out of ${goal.goal}
      </p>

      <div className=" bg-neutral-200 dark:bg-neutral-600 ">
        <div
          className="bg-green-500 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
          style={{ width: `${goalPercentage}%` }}
        >
          <p>{goalPercentage} %</p>
        </div>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          className="block"
          name="description"
          id=""
          rows="5"
          cols="40"
          value={goal.description}
          onChange={handleChange}
        >
          This is a test description with dummy data Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Molestiae autem deserunt rem iste, iusto
          amet quasi commodi, distinctio non quisquam culpa voluptate odit nisi!
          Veritatis repudiandae vitae quis voluptatibus possimus amet incidunt?
          Ducimus neque reprehenderit officiis totam cumque voluptatum et
          asperiores vero consequatur deleniti, tempora est quisquam dolores eum
          repellat veniam, ipsum ratione, illum doloribus fugiat error
          reiciendis explicabo? Quis?
        </textarea>
      </div>
      <button className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0">
        Save Changes
      </button>
    </>
  );
}

export default SavingsDetails;
