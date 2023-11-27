import { Link } from "react-router-dom";


function WalletList(props){
    const value = props.value;
    return(
        <Link to={`/wallet/${value.id}`}>
            <h3>{value.name}</h3>
            <p>{value.initialBalance}</p>
            <p>{value.bank}</p>
        </Link>
    )
}


export default WalletList;