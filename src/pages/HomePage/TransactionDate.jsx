import Transaction from "./Transaction";


function TransactionDate(props){
    const data = props.value;
    //let dailyTotalTransactionAmount = 0;
    // console.log(typeof data.transactionAmount.toString())

    return(
        <div>
            <div id="date">
                <ul className="flex justify-between border p-2">
                    <li>{data.date}</li>
                    <li>{data.transactionAmount > 0 ? '$' + data.transactionAmount : '-$' + data.transactionAmount.toString().replace('-', '')}</li>
                </ul>
            </div>
            <Transaction
                key={data.id}
                value={data}
            />
            


        </div>
    )
}

export default TransactionDate;