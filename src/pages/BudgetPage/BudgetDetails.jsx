import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../Config/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { getStartEndDate } from "../../assets/months";

function BudgetDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const budgetId = params.id;
  const [budget, setBudget] = useState();
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [budgetCategories, setBudgetCategories] = useState([]);
  const [budgetName, setBudgetName] = useState("");
  const [budgetRecurrence, setBudgetRecurrence] = useState("never");
  const [budgetStartDate, setBudgetStartDate] = useState(
    getStartEndDate().startDate
  );
  const docRef = doc(db, "budgets", params.id);
  console.log("Params", params);

  useEffect(() => {
    const getBudget = async () => {
      try {
        const budgetData = await getDoc(docRef);
        console.log("One item Data", budgetData.data());
        setBudget(budgetData.data());
        setBudgetCategories(budgetData.data().budgetFor);
        setBudgetAmount(budgetData.data().amount);
        setBudgetName(budgetData.data().name);
        setBudgetRecurrence(budgetData.data().recurrence);
        setBudgetStartDate(budgetData.data().startDate);
      } catch (error) {
        console.error(error);
      }
    };

    getBudget();
  }, []);

  console.log("Budget data:", budget);

  return (
    <>
      <div>
        <ul className="grid grid-cols-3">
          <li>
            <p onClick={() => navigate(-1)}>Back</p>
          </li>
          <li>Edit {budgetName}</li>
          <li className="text-right">Delete</li>
        </ul>
      </div>

      <div>
        <p>
          Budget has been exceeded by ___ but do not despair, it will get better
          next time
        </p>
        <p>
          Keep Spending. You can spend ____ each day for the rest of the period.
        </p>
      </div>

      <div>
        <h3>Previous Periods</h3>
      </div>
    </>
  );
}

export default BudgetDetails;
