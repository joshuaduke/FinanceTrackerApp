import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SavingsDetails() {
  const [goal, setGoal] = useState({});
  const param = useParams();
  const goalPercentage = (goal.currentBalance / goal.goal) * 100;
  useEffect(() => {
    fetch(`/api/saving/${param.id}`)
      .then((response) => response.json())
      .catch((err) => console.log("err", err))
      .then((data) => setGoal(data.savings));
  }, []);

  return (
    <>
      <div>
        <ul className="flex justify-between">
          <li>Back</li>
          <li>{goal.name}</li>
          <li>Delete</li>
        </ul>
      </div>
      <label htmlFor="">Name: </label>
      <input type="text" name="" id="" value={goal.name} />

      <div>
        <label htmlFor="">Goal Amount </label>
        <input type="number" value={goal.goal} />
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
        <textarea className="block" name="" id="" rows="5" cols="40">
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
