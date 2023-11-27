import './App.css'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import WalletPage from './pages/WalletPage/walletPage';
import WalletDetails from './pages/WalletPage/WalletDetails';
import HomePage from './pages/HomePage/HomePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/wallet"  element={ <WalletPage />} />
        <Route path="/wallet/:id"  element={ <WalletDetails />} />
      </Routes>
  </BrowserRouter>
  )
}

export default App
