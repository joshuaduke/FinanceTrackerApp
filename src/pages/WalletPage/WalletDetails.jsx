import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { formatCurrency } from "../../assets/currency/formatCurrency";
import { deleteDocument } from "../../assets/api/helperFunctions";
import TransactionDate from "../HomePage/TransactionDate";
import { sortTransactionsByDate } from "../../assets/api/transaction";

function WalletDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const docRef = doc(db, "wallets", params.id);
  const [walletType, setWalletType] = useState("");

  //instead of calling API use Link state to pass transaction data through the link
  console.log("Location state", location.state);

  const transactions = location.state?.walletTransactions;
  const transactionDates = sortTransactionsByDate(transactions);

  const [walletDetails, setWalletDetails] = useState({
    name: "",
    bank: "",
    creditLimit: "",
    balance: "",
    walletType: "",
    description: "",
  });

  useEffect(() => {
    async function getWallet() {
      try {
        const walletData = await getDoc(docRef);

        setWalletDetails({
          name: walletData.data().name,
          bank: walletData.data().bank,
          creditLimit: walletData.data().creditLimit,
          balance: walletData.data().balance,
          walletType: walletData.data().walletType,
          description: walletData.data().description,
        });

        setWalletType(walletData.data().walletType);
      } catch (error) {
        console.error(error);
      }
    }

    getWallet();
  }, [params.id]); //re run this request if the id ever changes, useful for calling a new wallet without reloading page

  async function deleteWallet(e) {
    try {
      e.preventDefault();
      const result = deleteDocument(docRef);
      if (result) {
        navigate("/wallet");
      }
    } catch (error) {
      console.log("Error in deleteWallet function");
      console.error(error);
    }
  }

  function handleChange(e) {
    setWalletDetails({
      ...walletDetails,
      [e.target.name]: e.target.value,
    });
  }

  console.log("Transactions", transactions);

  const monthlyCashFlow = transactions?.reduce(
    (acc, curr) => acc + curr.transactionAmount,
    walletDetails.balance
  );

  return (
    <div className="bg-bgPrimary">
      <form className="p-4 text-text">
        <div className="mb-4">
          <ul className="flex justify-between">
            <li className="place-self-center">
              <p onClick={() => navigate(-1)}>Back</p>
            </li>
            <li className="place-self-center">
              <h1
                className={
                  monthlyCashFlow < 0 ? "text-red-500" : "text-green-500"
                }
              >
                Cash Flow: {formatCurrency(monthlyCashFlow)}
              </h1>
            </li>
            <li>
              <button
                className="bg-impRed rounded-md p-2"
                onClick={deleteWallet}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
        {walletDetails ? (
          <div>
            <div>
              <label htmlFor="name" className="">
                Name:
              </label>
              <input
                className="w-full h-10 px-2 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
                type="text"
                name="name"
                value={walletDetails.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="bank">Bank: </label>
              <input
                className="w-full h-10 px-2 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
                type="text"
                name="bank"
                value={walletDetails.bank}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-between my-6">
              <label htmlFor="balance" className="place-self-center">
                Initial Balance:
              </label>
              <div className="self-center  w-fit justify-center flex items-center shadow-md">
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
                  className="w-fit h-10 px-2 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none"
                  type="number"
                  name="balance"
                  value={walletDetails.balance}
                  onChange={handleChange}
                />
              </div>
              {/* <span>{formatCurrency(walletDetails.balance)}</span> */}
            </div>

            <div>
              <label htmlFor="description" className="block">
                Description
              </label>
              <textarea
                name="description"
                className="max-w-full"
                cols="120"
                rows="5"
                value={walletDetails.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <p>Wallet Type</p>
              {walletType != "savings" ? (
                <>
                  <label htmlFor="walletType">Default</label>
                  <input
                    type="radio"
                    name="walletType"
                    id="type-default"
                    value="default"
                    onChange={handleChange}
                    checked={walletDetails.walletType === "default"}
                  />
                  <label htmlFor="walletType">Credit</label>
                  <input
                    type="radio"
                    name="walletType"
                    id="type-credit"
                    value="credit"
                    onChange={handleChange}
                    checked={walletDetails.walletType === "credit"}
                  />
                </>
              ) : (
                <>
                  <label htmlFor="walletType">Savings</label>
                  <input
                    type="radio"
                    name="walletType"
                    id="type-credit"
                    value="savings"
                    onChange={handleChange}
                    checked={walletDetails.walletType === "savings"}
                  />
                </>
              )}
            </div>

            <button className="block py-2 px-10 my-6 text-green-500 bg-green-900 rounded-lg w-fit mx-auto my-0">
              Save Changes
            </button>

            <h3>Wallet Transactions</h3>
            <div className="h-96 overflow-y-scroll ">
              {transactions ? (
                transactionDates.map((date, index) => (
                  <TransactionDate
                    key={index}
                    date={date}
                    transactions={transactions}
                  />
                ))
              ) : (
                <p>No transactions</p>
              )}
            </div>

            {/* {transactions ? (
            transactions.map((index) => <TransactionDate key={index} />)
          ) : (
            <p>No Transactions</p>
          )} */}
          </div>
        ) : (
          <h3>...Loading...</h3>
        )}
      </form>
    </div>
  );
}

export default WalletDetails;
