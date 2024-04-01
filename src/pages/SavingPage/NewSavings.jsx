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
  const [savingsGoalDate, setSavingsGoalDate] = useState("");
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
    <form className="" onSubmit={handleSubmit}>
      <div>
        <ul className="flex justify-between">
          <li>
            <p onClick={() => navigate(-1)}>Back</p>
          </li>
          <li>New Savings Goal</li>
          <li></li>
        </ul>
      </div>
      <label htmlFor="savings-name">Name: </label>
      <input
        type="text"
        name="savings-name"
        id="savingsName"
        value={savingsName}
        onChange={(e) => setSavingsName(e.target.value)}
        required
      />

      <div>
        <label htmlFor="goal-amount">Initial Amount: $</label>
        <input
          type="number"
          name="goal-amount"
          value={savingsInitialBalance}
          placeholder="0"
          onChange={(e) => setSavingsInitialBalance(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="goal-amount">Goal Amount: $</label>
        <input
          type="number"
          name="goal-amount"
          value={savingsGoalAmount}
          placeholder="0"
          onChange={(e) => setSavingsGoalAmount(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="goal-date">Goal Date</label>
        <input
          type="date"
          name="goal-date"
          id="goalDate"
          value={savingsGoalDate}
          onChange={(e) => setSavingsGoalDate(e.target.value)}
        />
      </div>

      {/* <div>
        <div>
          <p>Would you like to create a separate wallet for this goal?</p>
          <label htmlFor="saving-goal">Yes</label>
          <input
            type="radio"
            name="saving-goal"
            id="savingsGoal"
            value="yes"
            onChange={(e) => setSavingsGoalType(e.target.value)}
            checked={savingsGoalType === "yes"}
            required
          />
          <label htmlFor="savings-goal">No</label>
          <input
            type="radio"
            name="saving-goal"
            id="savingsGoal"
            value="no"
            onChange={(e) => setSavingsGoalType(e.target.value)}
            checked={savingsGoalType === "no"}
            required
          />
        </div>
      </div> */}

      <div>
        <label htmlFor="savings-description">Description</label>
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
      <div>
        <h3>Enter new wallet Details</h3>
        <div>
          <label htmlFor="wallet-name">Name: </label>
          <input
            type="text"
            name="wallet-name"
            value={walletName}
            onChange={(e) => setWalletName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="bank-name">Bank: </label>
          <input
            type="text"
            name="bank-name"
            value={walletBankName}
            onChange={(e) => setWalletBankName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="initial-balance">Current Balance: $</label>
          <input
            type="number"
            name="initial-balance"
            id=""
            value={walletInitialBalance}
            placeholder="0"
            onChange={(e) => setWalletInitialBalance(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="wallet-description">Description</label>
          <textarea
            name="wallet-description"
            id=""
            rows="5"
            cols="40"
            value={walletDescription}
            onChange={(e) => setWalletDescription(e.target.value)}
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0"
      >
        Save Changes
      </button>
    </form>
  );
}

export default NewSavings;
