import { useState } from "react";
import { calculateTransactionTotal } from "../assets/currency/formatCurrency";

export default function CashFlow({ transactions }) {
  //   const [totalCashFlow, setTotalCashFlow] = useState(
  //     calculateTransactionTotal(transactions)
  //   );
  const totalCashFlow = calculateTransactionTotal(transactions);

  return (
    <>
      <h1 className="text-white">
        Cash flow: <span>{totalCashFlow}</span>
      </h1>
    </>
  );
}
