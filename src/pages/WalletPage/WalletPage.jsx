import Footer from "../../components/footer/footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


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
            <Link to="/walletList">list</Link>
            <Footer />
        </>
        
    )
}

export default WalletPage;