import { useEffect, useState, useContext } from "react";
import Footer from "../../components/footer/footer";
import { Link } from "react-router-dom";
import SavingsGoal from "./Savings";
import { db } from "../../Config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Context } from "../../Context/AuthContext";

function SavingsPage() {
  const { user } = useContext(Context);
  const [goals, setGoals] = useState([]);
  const [savingsData, setSavingsData] = useState([]);
  const savingssCollectionRef = collection(db, "savings");

  useEffect(() => {
    const getSavings = async () => {
      try {
        const q1 = await query(
          savingssCollectionRef,
          where("user", "==", user.uid)
        );
        const data = await getDocs(q1);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("Data", filteredData);
        setSavingsData(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    getSavings();
  }, []);

  return (
    <>
      <Link className="fixed bottom-20 right-5 mb-5 " to="/savings/new">
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
      {savingsData ? (
        <div>
          {savingsData.map((item) => (
            <div key={item.id} className="my-2">
              <SavingsGoal data={item} user={user.uid} />
            </div>
          ))}
          {/* server.create("saving", { id: "1", name: "House", dueDate: "2030-01-06", isWallet: true, initialBalance: 0, currentBalance: 1000, goal: 50000, category: "not assigned"}) */}
          {/* <Link
            to="/savings/new"
            className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0"
          >
            Add new Savings Goal
          </Link> */}
        </div>
      ) : (
        <h1>... Loading ... </h1>
      )}

      <Footer />
    </>
  );
}

export default SavingsPage;
