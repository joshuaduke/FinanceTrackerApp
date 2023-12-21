import { useState } from "react";
import { Link } from "react-router-dom";
useState;

function SavingsGoal({ data }) {
  const goalPercentage = (data.currentBalance / data.goal) * 100;

  return (
    <>
      <Link to={`/savings/${data.id}`}>
        <h3>{data.name}</h3>
        <p>
          <span>You saved ${data.currentBalance}</span> saved out of $
          {data.goal}
        </p>
        <div className=" bg-neutral-200 dark:bg-neutral-600 ">
          <div
            className="bg-green-500 p-0.5 text-center text-xs font-medium leading-none text-primary-100"
            style={{ width: `${goalPercentage}%` }}
          >
            <p>{goalPercentage} %</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default SavingsGoal;
