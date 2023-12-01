import CategoryIcon from "../../components/CategoryIcon";

function Transaction(props){
    const data = props.value;
    //let dailyTotalTransactionAmount = 0;


    return(
        <div>
            <div id="date">
                <ul>
                    <li>{data.date}</li>
                    <li>{data.transactionAmount}</li>
                </ul>
            </div>
            <div id="transaction-item">
                <CategoryIcon category={data.category}/>
                <div>
                    <p>{data.category}</p>
                    <p>{data.wallet}</p>
                </div>
                <div>
                    <p>{data.transactionAmount}</p>
                </div>
            </div>
            <p>This is a transaction item</p>
            <hr />
        </div>
    )
}

export default Transaction;