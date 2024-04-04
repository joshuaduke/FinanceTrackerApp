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
      {/* <Link
        to="/budget/new"
        className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0"
      >
        + Budget
      </Link> */}

      <Link className="fixed bottom-20 right-5 mb-5 " to="/budget/new">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 32 32"
        >
          <path
            fill="white"
            d="M16 2A14.173 14.173 0 0 0 2 16a14.173 14.173 0 0 0 14 14a14.173 14.173 0 0 0 14-14A14.173 14.173 0 0 0 16 2Zm8 15h-7v7h-2v-7H8v-2h7V8h2v7h7Z"
          />
          <path fill="green" d="M24 17h-7v7h-2v-7H8v-2h7V8h2v7h7v2z" />
        </svg>
      </Link>
      {budgetGoals ? (
        <div>
          {budgetGoals.map((goal) => (
            <div key={goal.id} className="my-2">
              <Budget budgetData={goal} />
            </div>
          ))}
        </div>
      ) : (
        <h1>... Loading ... </h1>
      )}
      <Footer />
    </>
  );
}

export default BudgetPage;
