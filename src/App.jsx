import './App.css'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import WalletPage from './pages/WalletPage/walletPage';
import WalletList from './pages/WalletPage/WalletList';
import HomePage from './pages/HomePage/HomePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/wallet"  element={ <WalletPage />} />
        <Route path="/walletList"  element={ <WalletList />} />
      </Routes>
  </BrowserRouter>
  )
}

export default App
