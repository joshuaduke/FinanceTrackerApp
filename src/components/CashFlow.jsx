import { useState } from "react";
import {
  calculateTransactionTotal,
  formatCurrency,
} from "../assets/currency/formatCurrency";

export default function CashFlow({ transactions }) {
  //   const [totalCashFlow, setTotalCashFlow] = useState(
  //     calculateTransactionTotal(transactions)
  //   );
  const totalCashFlow = calculateTransactionTotal(transactions);

  return (
    <>
      <h1 className="text-white text-center text-xl">
        Cash flow: <span>{formatCurrency(totalCashFlow)}</span>
      </h1>
    </>
  );
}
