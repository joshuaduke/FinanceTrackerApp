import { useContext, useEffect, useState } from "react";
import { db } from "../../Config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getCurrentDate } from "../../assets/months";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../../Context/AuthContext";

function NewSavings() {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const location = useLocation();

  console.log("location", location);
  const [goal, setGoal] = useState({});
  const [savingsName, setSavingsName] = useState("");
  const [savingsGoalAmount, setSavingsGoalAmount] = useState("");
  const [savingsGoalDate, setSavingsGoalDate] = useState(getCurrentDate());
  const [savingsInitialBalance, setSavingsInitialBalance] = useState(0);
  // const [savingsGoalType, setSavingsGoalType] = useState("yes");
  const [savingsGoalDescription, setSavingsGoalDescription] = useState("");

  const [walletName, setWalletName] = useState("");
  const [walletInitialBalance, setWalletInitialBalance] = useState("");
  const [walletBankName, setWalletBankName] = useState("");
  const [walletDescription, setWalletDescription] = useState("");

  //   const goalPercentage = (goal.currentBalance / goal.goal) * 100;
  const goalPercentage = 0;

  useEffect(() => {
    if (location.state != null) {
      setWalletName(location.state.walletName);
      setWalletBankName(location.state.walletBank);
      setWalletInitialBalance(location.state.walletCurrentBalance);
      setWalletDescription(location.state.setWalletDescription);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const walletsRef = await addDoc(collection(db, "wallets"), {
      name: walletName,
      balance: walletInitialBalance,
      walletType: "savings",
      bank: walletBankName,
      createdDate: getCurrentDate(),
      user: user.uid,
    });

    const savingsRef = await addDoc(collection(db, "savings"), {
      name: savingsName,
      goal: savingsGoalAmount,
      dueDate: savingsGoalDate,
      description: savingsGoalDescription,
      walletId: walletsRef.id,
      currentAmount: savingsInitialBalance,
      user: user.uid,
      createdDate: getCurrentDate(),
    });

    navigate("/goals");
    console.log("Submitted Data", savingsRef.id);
  }

  return (
    <main className="  flex flex-col grow min-h-screen p-4">
      <div className=" text-text">
        <ul className="grid grid-cols-4">
          <li className="col-span-1">
            <p onClick={() => navigate(-1)}>Back</p>
          </li>
          <li className="col-span-2 text-center">New Savings Goal</li>
          <li className="col-span-1"></li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className=" flex flex-col grow">
        <div className="grow">
          <div className="flex justify-between my-4">
            <label htmlFor="savings-name" className=" text-text text-lg">
              Name:
            </label>
            <input
              className=" w-fit h-10 px-2 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
              type="text"
              name="savings-name"
              id="savingsName"
              value={savingsName}
              onChange={(e) => setSavingsName(e.target.value)}
              required
            />
          </div>

          <div className=" flex justify-between my-4">
            <label htmlFor="goal-amount" className=" text-text">
              Initial Amount: $
            </label>
            <input
              className=" w-fit h-10 px-2 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
              type="number"
              name="goal-amount"
              value={savingsInitialBalance}
              placeholder="0"
              onChange={(e) => setSavingsInitialBalance(e.target.value)}
              required
            />
          </div>

          <div className=" flex justify-between my-4">
            <label htmlFor="goal-amount" className="text-text">
              Goal Amount: $
            </label>
            <input
              type="number"
              className="text-text w-fit h-10 px-2 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
              name="goal-amount"
              value={savingsGoalAmount}
              placeholder="0"
              onChange={(e) => setSavingsGoalAmount(e.target.value)}
              required
            />
          </div>

          <div className=" flex justify-between my-4">
            <label htmlFor="goal-date" className="text-text">
              Goal Date
            </label>
            <input
              type="date"
              name="goal-date"
              id="goalDate"
              value={savingsGoalDate}
              onChange={(e) => setSavingsGoalDate(e.target.value)}
            />
          </div>

          <div className=" flex flex-col my-4">
            <label htmlFor="savings-description" className="text-text">
              Savings Goal Description
            </label>
            <textarea
              className="block"
              name="savings-description"
              id=""
              rows="5"
              cols="40"
              value={savingsGoalDescription}
              onChange={(e) => setSavingsGoalDescription(e.target.value)}
            ></textarea>
          </div>

          {/* WALLET FORM */}
          <div className=" my-4">
            <h3 className="text-text">Enter new wallet Details</h3>
            <div className="flex justify-between my-4">
              <label htmlFor="wallet-name" className="text-text">
                Name:{" "}
              </label>
              <input
                type="text"
                className="w-fit h-10 px-2 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
                name="wallet-name"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                required
              />
            </div>

            <div className=" flex justify-between my-4">
              <label htmlFor="bank-name" className="text-text">
                Bank:{" "}
              </label>
              <input
                type="text"
                className="w-fit h-10 px-2 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
                name="bank-name"
                value={walletBankName}
                onChange={(e) => setWalletBankName(e.target.value)}
              />
            </div>

            <div className=" flex justify-between my-4">
              <label htmlFor="initial-balance" className="text-text">
                Current Balance: $
              </label>
              <input
                type="number"
                name="initial-balance"
                className="w-fit h-10 px-2 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
                id=""
                value={walletInitialBalance}
                placeholder="0"
                onChange={(e) => setWalletInitialBalance(e.target.value)}
                required
              />
            </div>

            <div className=" flex flex-col my-4">
              <label className="block text-text" htmlFor="wallet-description">
                Wallet Description
              </label>
              <textarea
                name="wallet-description"
                className="inline-block"
                id=""
                rows="5"
                cols="40"
                value={walletDescription}
                onChange={(e) => setWalletDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="h-14 ">
          <button
            type="submit"
            className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0 "
          >
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}

export default NewSavings;
