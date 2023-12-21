import { useState } from "react";

function NewSavings() {
  const [goal, setGoal] = useState({});
  //   const goalPercentage = (goal.currentBalance / goal.goal) * 100;
  const goalPercentage = 0;

  return (
    <>
      <div>
        <ul className="flex justify-between">
          <li>Back</li>
          <li>New Savings Goal</li>
          <li>Delete</li>
        </ul>
      </div>
      <label htmlFor="">Name: </label>
      <input type="text" name="" id="" value="" />

      <div>
        <label htmlFor="">Goal Amount </label>
        <input type="number" value="" />
      </div>

      <div>
        <h3>Is Wallet</h3>
        <label htmlFor="">Yes</label>
        <input type="radio" name="" id="" value="Yes" />
        <label htmlFor="">No</label>
        <input type="radio" name="" id="" value="No" />
      </div>
      <p>
        <span>You saved ${goal.currentBalance}</span> saved out of ${goal.goal}
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
        <label htmlFor="">Description</label>
        <textarea className="block" name="" id="" rows="5" cols="40"></textarea>
      </div>
      <button className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0">
        Save Changes
      </button>
    </>
  );
}

export default NewSavings;
