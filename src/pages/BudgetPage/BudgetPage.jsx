import { useState } from "react";
import Footer from "../../components/footer/footer";
import Budget from "./Budget";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function BudgetPage() {
  const [budgetGoals, setBudgetGoals] = useState([]);
  const budgetData = [
    {
      id: "1",
      name: "House",
      dueDate: "2030-01-06",
      isWallet: true,
      initialBalance: 0,
      currentBalance: 15000,
      goal: 50000,
      category: "not assigned",
    },
    {
      id: "2",
      name: "Emergency Fund",
      dueDate: "2030-01-06",
      isWallet: true,
      initialBalance: 0,
      currentBalance: 3000,
      goal: 20000,
      category: "not assigned",
    },
    {
      id: "3",
      name: "TFSA",
      dueDate: "2030-01-06",
      isWallet: false,
      initialBalance: 0,
      currentBalance: 6000,
      goal: 10000,
      category: "not assigned",
    },
    {
      id: "4",
      name: "Car Downpayment",
      dueDate: "2030-01-06",
      isWallet: true,
      initialBalance: 0,
      currentBalance: 1300,
      goal: 10000,
      category: "not assigned",
    },
  ];

  useEffect(() => {
    setBudgetGoals(budgetData);
  }, []);

  return (
    <>
      <h1>This is the budget Page</h1>
      {budgetGoals ? (
        <div>
          {budgetGoals.map((goal) => (
            <Budget key={goal.id} data={goal} />
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
