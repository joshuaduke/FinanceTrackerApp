import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function WalletDetails() {
    const params = useParams();
    const [wallet, setWallet] = useState(null);


    useEffect(() => {
        fetch(`/api/wallet/${params.id}`)
            .then(response => response.json())
            .catch(err => console.log('err', err))
            .then(data => setWallet(data.wallets))
    }, [params.id]) //re run this request if the id ever changes, useful for calling a new wallet without reloading page

    console.log(wallet)

    return (
        <>
            {wallet ? 
            <div> 
                <h1>{wallet.name}</h1>
                <p>Bank {wallet.bank}</p>
                <p>Balance: ${wallet.initialBalance}</p>
            </div>
            : 
                <h3>...Loading...</h3>
            }

        </>
    )
}

export default WalletDetails;