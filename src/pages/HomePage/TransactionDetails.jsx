import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryIcon from "../../components/CategoryIcon";
import CategorySelection from "../../components/CategorySelection";
import ImportanceSelection from "../../components/ImportanceSelection";
import WalletSelection from "../WalletPage/WalletSelection";
import { db } from "../../Config/firebase";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import RecurrenceSelection from "../../components/RecurrenceSelection";

function TransactionDetails() {
  console.log("######### TRANSACTION DETAILS ############");
  const params = useParams();

  const docRef = doc(db, "transactions", params.id);
  console.log("Params", params);
  const [transactionObj, setTransactionObj] = useState({
    importance: "",
    recurrence: "",
  });

  const [transaction, setTransaction] = useState(null);
  const [categoryType, setCategoryType] = useState("expenses");
  const [category, setCategory] = useState("Misc");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [amountTransaction, setTransactionAmount] = useState(0);
  const [transactionWallet, setTransactionWallet] = useState("unselected");
  const [transactionWalletTo, setTransactionWalletTo] = useState("unselected");
  const [categoryToggle, setCategoryToggle] = useState(false);

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
          setTransactionAmount(transactionData.data().transactionAmount * -1);
          setTransactionWallet(transactionData.data().walletId);
          setCategoryType(transactionData.data().categoryType);
          setTransactionWalletTo(transactionData.data().toWalletId);

          setTransactionObj({
            recurrence: transactionData.data().recurrence,
            importance: transactionData.data().importance,
          });
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

  function handleChange(e) {
    setTransactionObj({ ...transactionObj, [e.target.name]: e.target.value });
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
        importance: transactionObj.importance,
        recurrence: transactionObj.recurrence,
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

  function handleCategorySelection(value) {
    setCategory(value);
    setCategoryToggle(!categoryToggle);
  }

  function handleCategoryToggle(e) {
    e.preventDefault();
    setCategoryToggle(!categoryToggle);
  }

  console.log("transaction", transaction);
  console.log("transaction amount:", amountTransaction);
  console.log("Transaction Details Category:", categoryType);

  return (
    <>
      {transaction ? (
        <form className="p-4 " onSubmit={updateTransaction}>
          <ul className="flex justify-between  text-text pb-4">
            <li className="place-self-center">
              <p type="default" onClick={() => navigate(-1)}>
                Back
              </p>
            </li>
            <li className="place-self-center">Edit {category}</li>
            <li>
              <button
                className="bg-impRed rounded-md p-2"
                onClick={deleteTransaction}
              >
                Delete
              </button>
            </li>
          </ul>
          <div className="flex justify-between">
            <CategoryIcon category={category} />
            <div className="self-center  w-1/2 justify-center flex items-center shadow-md">
              <div className="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-6 h-10 text-white ">
                <svg
                  className="h-5 w-5 fill-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 15h2c0 1.08 1.37 2 3 2s3-.92 3-2c0-1.1-1.04-1.5-3.24-2.03C9.64 12.44 7 11.78 7 9c0-1.79 1.47-3.31 3.5-3.82V3h3v2.18C15.53 5.69 17 7.21 17 9h-2c0-1.08-1.37-2-3-2s-3 .92-3 2c0 1.1 1.04 1.5 3.24 2.03C14.36 11.56 17 12.22 17 15c0 1.79-1.47 3.31-3.5 3.82V21h-3v-2.18C8.47 18.31 7 16.79 7 15" />
                </svg>
              </div>
              <input
                className="w-full h-10 px-2 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                type="number"
                name="transactionAmount"
                value={Math.abs(amountTransaction)}
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
            </div>
          </div>

          {categoryType == "Transfer" && (
            <span className="text-text">From</span>
          )}
          <WalletSelection
            transactionWallet={transactionWallet}
            setWallet={setTransactionWallet}
          />

          {categoryType == "Transfer" && (
            <>
              <span className="text-text">To </span>
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
                    fill=""
                    d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5v-5Z"
                  />
                </svg>
                <span className="ml-2 items-center text-text text-lg">
                  Date
                </span>
              </li>
            </ul>
            <div>
              <input
                type="date"
                name="date"
                id="date"
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
              />
            </div>
          </div>

          <ImportanceSelection
            importance={transactionObj.importance}
            handleChange={handleChange}
          />

          {/* <RecurrenceSelection
            recurrence={transactionObj.recurrence}
            handleChange={handleChange}
          /> */}

          <label htmlFor="description" className="block text-text text-lg">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="max-w-full rounded-md p-2"
            cols="120"
            rows="5"
            onChange={(e) => setTransactionDescription(e.target.value)}
          >
            {transactionDescription}
          </textarea>

          <button
            className="p-2 bg-complement1 w-full rounded-md"
            onClick={(e) => handleCategoryToggle(e)}
          >
            Select Category
          </button>

          {categoryType != "Transfer" && categoryToggle && (
            <CategorySelection
              categoryType={categoryType}
              setCategory={handleCategorySelection}
              selectCategoryType={selectCategoryType}
              category={category}
              categoryToggle={categoryToggle}
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
