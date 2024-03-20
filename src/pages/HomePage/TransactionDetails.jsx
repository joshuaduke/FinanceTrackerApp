import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryIcon from "../../components/CategoryIcon";
import CategorySelection from "../../components/CategorySelection";
import ImportanceSelection from "../../components/ImportanceSelection";
import WalletSelection from "../WalletPage/WalletSelection";
import { db } from "../../Config/firebase";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

function TransactionDetails() {
  console.log("######### TRANSACTION DETAILS ############");
  const params = useParams();

  const docRef = doc(db, "transactions", params.id);
  console.log("Params", params);
  const [transactionObj, setTransactionObj] = useState({
    category: "",
    categoryType: "",
    date: "",
    importance: "",
    recurrence: "",
    transactionAmount: "",
    walletId: "",
  });

  const [transaction, setTransaction] = useState(null);
  const [categoryType, setCategoryType] = useState("expenses");
  const [category, setCategory] = useState("Misc");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transactionImportance, setTransactionImportance] = useState("");
  const [transactionRecurrence, setTransactionRecurrence] = useState("");
  const [amountTransaction, setTransactionAmount] = useState(0);
  const [transactionWallet, setTransactionWallet] = useState("unselected");
  const [transactionWalletTo, setTransactionWalletTo] = useState("unselected");

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(params).length != 0) {
      const getTransaction = async () => {
        try {
          const transactionData = await getDoc(docRef);
          console.log("One item Data", transactionData.data());
          setTransaction(transactionData.data());
          setCategory(transactionData.data().category);
          setTransactionDate(transactionData.data().date);
          setTransactionDescription(transactionData.data().description);
          setTransactionImportance(transactionData.data().importance);
          setTransactionAmount(transactionData.data().transactionAmount);
          setTransactionRecurrence(transactionData.data().recurrence);
          setTransactionWallet(transactionData.data().walletId);
          setCategoryType(transactionData.data().categoryType);

          setTransactionWalletTo(transactionData.data().toWalletId);
        } catch (error) {
          console.error(error);
        }
      };

      getTransaction();
    } else {
      alert("False");
    }
  }, [params.id]); //re run this request if the id ever changes, useful for calling a new wallet without reloading page

  function selectCategoryType(value) {
    setCategoryType(value);

    console.log(categoryType);
  }

  function selectCategory(value) {
    setCategory(value);
  }

  async function updateTransaction(e) {
    try {
      e.preventDefault();
      //let confirmText = "Are you sure you want to update this transaction?";
      // if (confirm(confirmText) == true) {}

      await updateDoc(docRef, {
        category: category,
        categoryType: categoryType,
        date: transactionDate,
        description: transactionDescription,
        importance: transactionImportance,
        recurrence: transactionRecurrence,
        transactionAmount:
          categoryType == "expenses"
            ? parseFloat(amountTransaction * -1)
            : parseFloat(amountTransaction),
        walletId: transactionWallet,
        ...(categoryType === "Transfer"
          ? { toWalletId: transactionWalletTo }
          : {}),
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTransaction(e) {
    try {
      e.preventDefault();
      let confirmText = "Are you sure you want to delete this transaction?";

      if (confirm(confirmText) == true) {
        await deleteDoc(docRef);
        navigate("/");
      }
    } catch (error) {
      console.log("Error in deleteTransaction function");
      console.error(error);
    }
  }

  console.log("transaction", transaction);
  console.log("Transaction Details Category:", categoryType);

  return (
    <>
      {transaction ? (
        <form className="p-6" onSubmit={updateTransaction}>
          <ul className="flex justify-between">
            <li>
              <p type="default" onClick={() => navigate(-1)}>
                Back
              </p>
            </li>
            <li>Edit {category}</li>
            <li>
              <button onClick={deleteTransaction}>Delete</button>
            </li>
          </ul>
          <div className="flex justify-between">
            <CategoryIcon category={category} />
            <div className="self-center">
              {/* <h3>{transactionAmount}</h3> */}
              <input
                type="number"
                name="transactionAmount"
                value={Math.abs(amountTransaction)}
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
            </div>
          </div>

          {categoryType == "Transfer" && <span>From</span>}
          <WalletSelection
            transactionWallet={transactionWallet}
            setWallet={setTransactionWallet}
          />

          {categoryType == "Transfer" && (
            <>
              <span>To </span>
              <WalletSelection
                transactionWallet={transactionWalletTo}
                setWallet={setTransactionWalletTo}
              />
            </>
          )}

          <div id="date-selection" className="flex justify-between">
            <ul>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5v-5Z"
                  />
                </svg>
                <span className="ml-5">Date</span>
              </li>
            </ul>
            <div>
              <input
                type="date"
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
              />
            </div>
          </div>

          <ImportanceSelection
            importance={transactionImportance}
            selectTransactionImportance={setTransactionImportance}
          />

          <div id="recurrence-selection" className="flex justify-between">
            <ul>
              <li className="flex">
                <svg
                  className="place-self-center "
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M6 20q-1.65 0-2.825-1.175T2 16V8q0-1.65 1.175-2.825T6 4h12q1.65 0 2.825 1.175T22 8v8q0 1.65-1.175 2.825T18 20H6ZM6 8h12q.55 0 1.05.125t.95.4V8q0-.825-.587-1.412T18 6H6q-.825 0-1.412.588T4 8v.525q.45-.275.95-.4T6 8Zm-1.85 3.25l11.125 2.7q.225.05.45 0t.425-.2l3.475-2.9q-.275-.375-.7-.612T18 10H6q-.65 0-1.137.338t-.713.912Z"
                  />
                </svg>
                <span className="ml-5">Recurrence</span>
              </li>
            </ul>
            <div>
              <select
                name=""
                id=""
                value={transactionRecurrence}
                onChange={(e) => setTransactionRecurrence(e.target.value)}
              >
                <option value="never">Never</option>
                <option value="monthly">monthly</option>
                <option value="biweekly">biweekly</option>
                <option value="yearly">yearly</option>
              </select>
            </div>
          </div>

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id=""
            cols="30"
            rows="10"
            onChange={(e) => setTransactionDescription(e.target.value)}
          >
            {transactionDescription}
          </textarea>

          {categoryType != "Transfer" && (
            <CategorySelection
              categoryType={categoryType}
              setCategory={selectCategory}
              selectCategoryType={selectCategoryType}
              category={category}
            />
          )}

          <button className="block py-2 px-10 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0">
            Save Changes
          </button>
        </form>
      ) : (
        <h2>...Loading...</h2>
      )}
    </>
  );
}

export default TransactionDetails;
