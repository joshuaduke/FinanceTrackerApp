import { useState } from "react";
import Footer from "../../components/footer/footer";
import SavingsPage from "../SavingPage/SavingsPage";
import BudgetPage from "../BudgetPage/BudgetPage";

function GoalPage() {
  const [selectedGoal, setSelectedGoal] = useState("budget");
  return (
    <main className="grid w-full place-items-center">
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-gray-200 p-2">
        <div>
          <input
            className="peer hidden"
            type="radio"
            name="goal"
            id="budget"
            value="budget"
            onChange={() => setSelectedGoal("budget")}
            checked={selectedGoal === "budget"}
          />
          <label
            htmlFor="goal"
            onClick={() => setSelectedGoal("budget")}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            Budget
          </label>
        </div>

        <div>
          <input
            className="peer hidden"
            type="radio"
            name="goal"
            id="saving"
            value="saving"
            onChange={() => setSelectedGoal("saving")}
            checked={selectedGoal === "saving"}
          />
          <label
            htmlFor="goal"
            onClick={() => setSelectedGoal("saving")}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            Saving
          </label>
        </div>
      </div>
      <div className="w-full mb-20">
        {selectedGoal === "saving" ? <SavingsPage /> : <BudgetPage />}
      </div>

      <Footer />
    </main>
  );
}

export default GoalPage;
