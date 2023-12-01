import Footer from "../../components/footer/footer";
import Transaction from "./Transaction";
import { useEffect, useState } from "react";

function HomePage(){
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch("/api/transaction")
            .then(response => response.json())
            .catch(err => console.log('err', err))
            .then(data => setTransactions(data.transactions))
    } , [])

    console.log("Data", transactions);


    return(
        <>
            <h1>This is the home page</h1>
            <div>
                {transactions.map((item) => 
                    <Transaction 
                        key={item.id}
                        value={item}
                    /> 
                )}
            </div>
            <Footer />
        </>
        
    )
}

export default HomePage;