import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <>
            <Link to="/">Timeline</Link>
            <Link to="/wallet">Wallet</Link>
            <Link to="/budget">Budget</Link>
            <Link to="/savings">Savings</Link>
            <Link to="setting">Settings</Link>
        </>
    )
}