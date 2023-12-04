import CategoryIcon from "../../components/CategoryIcon";

function Transaction(props){
    const data = props.value;
    //let dailyTotalTransactionAmount = 0;
    console.log(typeof data.transactionAmount.toString())

    return(
        <div>
            {/* <div id="date">
                <ul className="flex justify-between border p-2">
                    <li>{data.date}</li>
                    <li>{data.transactionAmount > 0 ? '$' + data.transactionAmount : '-$' + data.transactionAmount.toString().replace('-', '')}</li>
                </ul>
            </div> */}
            <div className="flex justify-between items-center px-5 py-3" id="transaction-item">
                <CategoryIcon className="basis-1/4" category={data.category}/>
                <div className="basis-1/2">
                    <p>{data.description}</p>
                    <p>{data.wallet}</p>
                </div>
                <div className="basis-1/4 text-end">
                    <p>{data.transactionAmount}</p>
                </div>
            </div>
        </div>
    )
}

export default Transaction;