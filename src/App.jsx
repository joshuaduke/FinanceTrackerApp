import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WalletPage from "./pages/WalletPage/WalletPage";
import WalletDetails from "./pages/WalletPage/WalletDetails";
import NewWallet from "./pages/WalletPage/NewWallet";
import NewTransaction from "./pages/HomePage/NewTransaction";
import TransactionDetails from "./pages/HomePage/TransactionDetails";
import HomePage from "./pages/HomePage/HomePage";
import Categories from "./components/Categories";
import SavingsPage from "./pages/SavingPage/SavingsPage";
import SavingsDetails from "./pages/SavingPage/SavingsDetails";
import NewSavings from "./pages/SavingPage/NewSavings";
import BudgetPage from "./pages/BudgetPage/BudgetPage";
import BudgetDetails from "./pages/BudgetPage/BudgetDetails";
import NewBudget from "./pages/BudgetPage/NewBudget";
import Settings from "./pages/SettingsPage/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/wallet/:id" element={<WalletDetails />} />
        <Route path="/wallet/new" element={<NewWallet />} />
        <Route path="/transaction/:id" element={<TransactionDetails />} />
        <Route path="/transaction/new" element={<NewTransaction />} />
        <Route path="/savings" element={<SavingsPage />} />
        <Route path="/savings/:id" element={<SavingsDetails />} />
        <Route path="/savings/new" element={<NewSavings />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/budget/:id" element={<BudgetDetails />} />
        <Route path="/budget/new" element={<NewBudget />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
