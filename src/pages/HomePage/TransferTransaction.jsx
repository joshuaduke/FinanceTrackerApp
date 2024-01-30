import WalletSelection from "../WalletPage/WalletSelection";
import { useState } from "react";
import { getCurrentDate } from "../../assets/months";
import RecurrenceSelection from "../../components/RecurrenceSelection";
import { db } from "../../Config/firebase";
import { addDoc, updateDoc, collection } from "firebase/firestore";
import CategoryIcon from "../../components/CategoryIcon";
import { useNavigate } from "react-router-dom";

function TransferTransaction() {
  const navigate = useNavigate();
  const [fromWallet, setFromWallet] = useState("");
  const [toWallet, setToWallet] = useState("");
  const [transferDate, setTransferDate] = useState(getCurrentDate);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferDescription, setTransferDescription] = useState("");
  const [recurrence, setRecurrence] = useState("never");

  async function handleTransferSubmit(e) {
    e.preventDefault();
    const transactionRef = await addDoc(collection(db, "transactions"), {
      category: "Transfer",
      transactionAmount: parseInt(transferAmount),
      date: transferDate,
      recurrence: recurrence,
      categoryType: "Transfer",
      description: transferDescription,
      walletId: fromWallet,
      toWalletId: toWallet,
      createdDate: getCurrentDate(),
    });
    // let data = {
    //   category: category,
    //   amount: amount,
    //   date: date,
    //   importance: importance,
    //   recurrence: recurrence,
    //   categoryType: categoryType,
    //   description: description,
    //   wallet: wallet,
    // };
    navigate("/");
    console.log("Submitted Data", transactionRef);
  }

  return (
    <form onSubmit={(e) => handleTransferSubmit(e)}>
      <div id="transfer-header">
        <ul className="flex justify-between">
          <li>Exit</li>
          <li>Add Transfer</li>
        </ul>

        <div id="transfer-icon" className="flex justify-between">
          <CategoryIcon category="Transfer" />
          <div>
            <label htmlFor="transfer-amount">$</label>
            <input
              type="number"
              name="transfer-amount"
              id="transfer-amount"
              placeholder="0"
              className="text-right"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="">From </label>
        <WalletSelection transactionWallet={""} setWallet={setFromWallet} />

        <label htmlFor="">To </label>
        <WalletSelection transactionWallet={""} setWallet={setToWallet} />
      </div>

      <div className="flex justify-between">
        <label htmlFor="">Date</label>
        <input
          type="date"
          name=""
          id=""
          value={transferDate}
          onChange={(e) => setTransferDate(e.target.value)}
        />
      </div>

      <RecurrenceSelection
        recurrence={recurrence}
        setRecurrence={setRecurrence}
      />

      <div>
        <label htmlFor="transfer-description">Description</label>
        <textarea
          name="transfer-description"
          value={transferDescription}
          onChange={(e) => setTransferDescription(e.target.value)}
          cols="30"
          rows="10"
        ></textarea>
      </div>

      <button
        type="submit"
        className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0"
      >
        Transfer Transaction
      </button>
    </form>
  );
}

export default TransferTransaction;
