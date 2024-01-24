import { useState, useEffect } from "react";
import Footer from "../../components/footer/footer";
import Budget from "./Budget";
import { Link } from "react-router-dom";
import { db } from "../../Config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

function BudgetPage() {
  const budgetsCollectionRef = collection(db, "budgets");
  const [budgetGoals, setBudgetGoals] = useState([]);

  useEffect(() => {
    const getBudgets = async () => {
      try {
        const data = await getDocs(budgetsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("Data", filteredData);
        setBudgetGoals(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    getBudgets();
  }, []);

  return (
    <>
      {budgetGoals ? (
        <div>
          {budgetGoals.map((goal) => (
            <div key={goal.id} className="my-2">
              <Budget budgetData={goal} />
            </div>
          ))}
          {/* server.create("saving", { id: "1", name: "House", dueDate: "2030-01-06", isWallet: true, initialBalance: 0, currentBalance: 1000, goal: 50000, category: "not assigned"}) */}
          <Link
            to="/budget/new"
            className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0"
          >
            Add new Budget
          </Link>
        </div>
      ) : (
        <h1>... Loading ... </h1>
      )}
      <Footer />
    </>
  );
}

export default BudgetPage;
