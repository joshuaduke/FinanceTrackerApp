import Footer from "../../components/footer/footer";
import Transaction from "./Transaction";
import TransactionDate from "./TransactionDate";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function HomePage(){
    const [transactions, setTransactions] = useState([]);
    const params = useParams();

    let tempDate = "";

    useEffect(() => {
        fetch("/api/transaction")
            .then(response => response.json())
            .catch(err => console.log('err', err))
            .then(data => {
                console.log('Data', data)
                let sortedTransactions = () => data.transactions.sort((a,b)=>{
                    let dateA = new Date(a.date);
                    let dateB = new Date(b.date)
                    return dateB - dateA;
                })
                setTransactions(sortedTransactions);
            })
            
    } , [])

console.log('Transactions', transactions);

    // console.log('Params', params);
    // if(Object.keys(params).length != 0 ){
    //     alert('true')
    // } else {
    //     alert('False');
    // }

    return(
        <div id="home-page" className="py-2 pb-10">
            <button>Overview</button>
            <div className="h-screen">
                {transactions.map((transaction) => {

                    if(transaction.date != tempDate){
                        tempDate = transaction.date;

                        return <TransactionDate 
                                    key={transaction.id}
                                    value={transaction}
                                />
                    } else {
                        tempDate = transaction.date;

                        return <Transaction 
                                    key={transaction.id}
                                    value={transaction}
                                /> 
                    }
                    
                })}

            </div>
            <Link className="fixed bottom-20 right-5 mb-5" to="/transaction/new">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="currentColor" d="M16 2A14.173 14.173 0 0 0 2 16a14.173 14.173 0 0 0 14 14a14.173 14.173 0 0 0 14-14A14.173 14.173 0 0 0 16 2Zm8 15h-7v7h-2v-7H8v-2h7V8h2v7h7Z"/><path fill="none" d="M24 17h-7v7h-2v-7H8v-2h7V8h2v7h7v2z"/></svg>
            </Link>
            <Footer />
        </div>
        
    )
}

export default HomePage;