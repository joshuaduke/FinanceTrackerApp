import { useState } from "react";
import { calculateTransactionTotal } from "../assets/currency/formatCurrency";

export default function CashFlow({ transactions }) {
  //   const [totalCashFlow, setTotalCashFlow] = useState(
  //     calculateTransactionTotal(transactions)
  //   );
  const totalCashFlow = calculateTransactionTotal(transactions);

  return (
    <>
      <h1>
        Cash flow: <span>{totalCashFlow}</span>
      </h1>
    </>
  );
}
