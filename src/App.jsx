import './App.css'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import WalletPage from './pages/WalletPage/WalletPage';
import HomePage from './pages/HomePage/HomePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/wallet"  element={ <WalletPage />} />
      </Routes>
  </BrowserRouter>
  )
}

export default App
