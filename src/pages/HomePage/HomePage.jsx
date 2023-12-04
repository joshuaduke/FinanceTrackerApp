import Footer from "../../components/footer/footer";
import Transaction from "./Transaction";
import TransactionDate from "./TransactionDate";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage(){
    const [transactions, setTransactions] = useState([]);
    let tempDate = "";
    
    useEffect(() => {
        fetch("/api/transaction")
            .then(response => response.json())
            .catch(err => console.log('err', err))
            .then(data => {
                let sortedTransactions = () => data.transactions.sort((a,b)=>{
                    let dateA = new Date(a.date);
                    let dateB = new Date(b.date)
                    return dateB - dateA;
                })
                setTransactions(sortedTransactions);
            })
    } , [])

    console.log("Data", transactions);



    return(
        <>
            <button>Overview</button>
            <div className="h-screen">
                {transactions.map((transaction) => {
                    console.log('Date', transaction.date);

                    if(transaction.date != tempDate){
                        tempDate = transaction.date;


                        return <TransactionDate 
                            key={transaction.id}
                            value={transaction}/>
                    } else {
                        tempDate = transaction.date;

                        return <Transaction 
                        key={transaction.id}
                        value={transaction}
                    /> 
                    }
                    
                })}

            </div>
            <Link className="fixed bottom-20 right-5 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2A14.173 14.173 0 0 0 2 16a14.173 14.173 0 0 0 14 14a14.173 14.173 0 0 0 14-14A14.173 14.173 0 0 0 16 2Zm8 15h-7v7h-2v-7H8v-2h7V8h2v7h7Z"/><path fill="none" d="M24 17h-7v7h-2v-7H8v-2h7V8h2v7h7v2z"/></svg>
            </Link>
            <Footer />
        </>
        
    )
}

export default HomePage;