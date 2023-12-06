
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryIcon from "../../components/CategoryIcon";
import { Link, useNavigate } from "react-router-dom";

function TransactionDetails() {
    const params = useParams();
    const [transaction, setTransaction] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`/api/transaction/${params.id}`)
            .then(response => response.json())
            .catch(err => console.log('err', err))
            .then(data => setTransaction(data.transactions))
    }, [params.id]) //re run this request if the id ever changes, useful for calling a new wallet without reloading page

    console.log(transaction)

    return (
        <>
            {transaction ? 
            <div> 
                <ul className="flex justify-between">
                    <li>
                        <button onClick={() => navigate(-1)}>Back</button>
                    </li>
                    <li>Edit {transaction.category}</li>
                    <li>Delete</li>
                </ul>
                <div className="flex justify-between">
                    <CategoryIcon category={transaction.category}/>
                    <div className="self-center">
                        <h3>{transaction.transactionAmount}</h3>
                    </div>
                </div>

                <div id="wallet-selection" className="flex justify-between">
                    <ul>
                        <li className="flex">
                        <svg 
                    className="place-self-center " 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6 20q-1.65 0-2.825-1.175T2 16V8q0-1.65 1.175-2.825T6 4h12q1.65 0 2.825 1.175T22 8v8q0 1.65-1.175 2.825T18 20H6ZM6 8h12q.55 0 1.05.125t.95.4V8q0-.825-.587-1.412T18 6H6q-.825 0-1.412.588T4 8v.525q.45-.275.95-.4T6 8Zm-1.85 3.25l11.125 2.7q.225.05.45 0t.425-.2l3.475-2.9q-.275-.375-.7-.612T18 10H6q-.65 0-1.137.338t-.713.912Z"/>
                    </svg>
                            <span className="ml-5">Wallet</span>
                        </li>
                    </ul>
                    <div>
                        <select name="" id="">
                            <option value="Gold Amex">Gold Amex</option>
                            <option value="TD Credit">TD Credit</option>
                            <option value="Scotiabank Amex">Scotiabank Amex</option>
                        </select>
                    </div>
                </div>

                <div id="date-selection" className="flex justify-between">
                    <ul>
                        <li className="flex">
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5v-5Z"/>
                        </svg>
                        <span className="ml-5">Date</span>
                        </li>
                    </ul>
                    <div>
                        <input type="date" />
                    </div>
                </div>

                <div id="importance-selection">
                    <ul>
                        <li className="flex">
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24">
                            <path fill="currentColor" d="M1 21L12 2l11 19H1Zm11-3q.425 0 .713-.288T13 17q0-.425-.288-.712T12 16q-.425 0-.712.288T11 17q0 .425.288.713T12 18Zm-1-3h2v-5h-2v5Z"/>
                        </svg>
                        <span className="ml-5">Importance</span>
                        </li>
                    </ul>
                    <div>
                        <input type="radio" name="" id="" />
                        <label htmlFor="">Essential</label>
                        <input type="radio" name="" id="" />
                        <label htmlFor="">Have To Have</label>
                        <input type="radio" name="" id="" />
                        <label htmlFor="">Nice To Have</label>
                        <input type="radio" name="" id="" />
                        <label htmlFor="">Shouldn&apos;t Have</label>
                    </div>
                </div>

                <div id="recurrence-selection" className="flex justify-between">
                    <ul>
                        <li className="flex">
                        <svg 
                    className="place-self-center " 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24">
                        <path fill="currentColor" d="M6 20q-1.65 0-2.825-1.175T2 16V8q0-1.65 1.175-2.825T6 4h12q1.65 0 2.825 1.175T22 8v8q0 1.65-1.175 2.825T18 20H6ZM6 8h12q.55 0 1.05.125t.95.4V8q0-.825-.587-1.412T18 6H6q-.825 0-1.412.588T4 8v.525q.45-.275.95-.4T6 8Zm-1.85 3.25l11.125 2.7q.225.05.45 0t.425-.2l3.475-2.9q-.275-.375-.7-.612T18 10H6q-.65 0-1.137.338t-.713.912Z"/>
                    </svg>
                            <span className="ml-5">Recurrence</span>
                        </li>
                    </ul>
                    <div>
                        <select name="" id="">
                            <option value="never">Never</option>
                            <option value="monthly">monthly</option>
                            <option value="biweekly">biweekly</option>
                            <option value="yearly">yearly</option>
                        </select>
                    </div>
                </div>
                

                <h1>{transaction.description}</h1>
                <p>Date {transaction.date}</p>
                <p>Amount: ${transaction.transactionAmount}</p>
            </div>
            : 
                <h3>...Loading...</h3>
            }

        </>
    )
}

export default TransactionDetails;