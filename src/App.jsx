import './App.css'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import WalletPage from './pages/WalletPage/WalletPage';
import WalletDetails from './pages/WalletPage/WalletDetails';
import NewTransaction from './pages/HomePage/NewTransaction';
import TransactionDetails from './pages/HomePage/TransactionDetails';
import HomePage from './pages/HomePage/HomePage';
import Categories from './components/Categories';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/wallet"  element={ <WalletPage />} />
        <Route path="/categories"  element={ <Categories />} />
        <Route path="/wallet/:id"  element={ <WalletDetails />} />
        <Route path="/transaction/:id"  element={ <TransactionDetails />} />
        <Route path="/transaction/new"  element={ <NewTransaction />} />
      </Routes>
  </BrowserRouter>
  )
}

export default App
