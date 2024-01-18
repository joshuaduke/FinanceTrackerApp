import { useState } from "react";
import Footer from "../../components/footer/footer";
import SavingsPage from "../SavingPage/SavingsPage";
import BudgetPage from "../BudgetPage/BudgetPage";

function GoalPage() {
  const [selectedGoal, setSelectedGoal] = useState("budget");
  return (
    <>
      <div>
        <div>
          <label htmlFor="goal">Budget</label>
          <input
            type="radio"
            name="goal"
            id="budget"
            value="budget"
            onChange={() => setSelectedGoal("budget")}
            checked={selectedGoal === "budget"}
          />

          <label htmlFor="">Saving</label>
          <input
            type="radio"
            name="goal"
            id="saving"
            value="saving"
            onChange={() => setSelectedGoal("saving")}
            checked={selectedGoal === "saving"}
          />
        </div>

        {selectedGoal === "saving" ? <SavingsPage /> : <BudgetPage />}
      </div>
      <Footer />
    </>
  );
}

export default GoalPage;
