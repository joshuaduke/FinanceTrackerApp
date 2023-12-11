import Footer from "../../components/footer/footer";
import { useEffect, useState } from "react";
import Wallet from "./Wallet";

function WalletPage(){
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        fetch("/api/wallet")
            .then(response => response.json())
            .catch(err => console.log('err', err))
            .then(data => setWallets(data.wallets))
    }, [])

    return (

        <>
            <h1>Wallet Page</h1>
            <ul>
                {wallets.map((item) => 
                    <Wallet 
                        key={item.id}
                        value={item}
                    /> )}
            </ul>
            <Footer />
        </>
        
    )
}

export default WalletPage;