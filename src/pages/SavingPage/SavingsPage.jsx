import { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import { Link } from "react-router-dom";
import SavingsGoal from "./Savings";
import { db } from "../../Config/firebase";
import { collection, getDocs } from "firebase/firestore";

function SavingsPage() {
  const [goals, setGoals] = useState([]);
  const [savingsData, setSavingsData] = useState([]);
  const savingssCollectionRef = collection(db, "savings");

  useEffect(() => {
    const getSavings = async () => {
      try {
        const data = await getDocs(savingssCollectionRef);
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

  // const savingsData = [
  //   {
  //     id: "1",
  //     name: "House",
  //     dueDate: "2030-01-06",
  //     isWallet: true,
  //     initialBalance: 0,
  //     currentBalance: 15000,
  //     goal: 50000,
  //     category: "not assigned",
  //   },
  //   {
  //     id: "2",
  //     name: "Emergency Fund",
  //     dueDate: "2030-01-06",
  //     isWallet: true,
  //     initialBalance: 0,
  //     currentBalance: 3000,
  //     goal: 20000,
  //     category: "not assigned",
  //   },
  //   {
  //     id: "3",
  //     name: "TFSA",
  //     dueDate: "2030-01-06",
  //     isWallet: false,
  //     initialBalance: 0,
  //     currentBalance: 6000,
  //     goal: 10000,
  //     category: "not assigned",
  //   },
  //   {
  //     id: "4",
  //     name: "Car Downpayment",
  //     dueDate: "2030-01-06",
  //     isWallet: true,
  //     initialBalance: 0,
  //     currentBalance: 1300,
  //     goal: 10000,
  //     category: "not assigned",
  //   },
  // ];

  // useEffect(() => {
  //    fetch("/api/saving")
  //      .then((response) => response.json())
  //      .catch((err) => console.log("err", err))
  //      .then((data) => setGoals(data.savings));
  //   setSavingsData(savingsData);
  // }, []);

  // console.log('Goals', goals);

  return (
    <>
      <div>
        <h1 className="text-center py-4">Savings</h1>
      </div>
      {savingsData ? (
        <div>
          {savingsData.map((item) => (
            <SavingsGoal key={item.id} data={item} />
          ))}
          {/* server.create("saving", { id: "1", name: "House", dueDate: "2030-01-06", isWallet: true, initialBalance: 0, currentBalance: 1000, goal: 50000, category: "not assigned"}) */}
          <Link
            to="/savings/new"
            className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0"
          >
            Add new Savings Goal
          </Link>
        </div>
      ) : (
        <h1>... Loading ... </h1>
      )}

      <Footer />
    </>
  );
}

export default SavingsPage;
