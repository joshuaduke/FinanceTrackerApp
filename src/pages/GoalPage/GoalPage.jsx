import { useState } from "react";
import Footer from "../../components/footer/footer";
import SavingsPage from "../SavingPage/SavingsPage";
import BudgetPage from "../BudgetPage/BudgetPage";

function GoalPage() {
  const [selectedGoal, setSelectedGoal] = useState("budget");
  return (
    <main className="grid w-full place-items-center p-4">
      <div className="grid w-full grid-cols-2 gap-2 rounded-md bg-secondary p-1">
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
            className="block cursor-pointer select-none rounded-md p-2 text-center peer-checked:bg-primary peer-checked:font-bold text-text"
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
            className="block cursor-pointer select-none rounded-md p-2 text-center peer-checked:bg-primary peer-checked:font-bold text-text"
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
