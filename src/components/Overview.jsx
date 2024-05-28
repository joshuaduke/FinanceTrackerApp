import { useNavigate, useLocation } from "react-router-dom";
import Period from "./Period";
import { useState } from "react";
import ImportanceChart from "./ImportanceChart";
import TransactionChart from "./transactionChart";
import CategoryChart from "./CategoryChart";

function Overview() {
  const navigate = useNavigate();
  const state = useLocation();
  const [period, setPeriod] = useState(state.state.period);
  console.log("State", state);
  let transactionDays = [];
  transactionDays = state.state.transactionDays;
  let transactions = [];
  transactions = state.state.transactions;

  return (
    <>
      <div className="text-text px-4">
        <div>
          <button onClick={() => navigate(-1)}>Back Home</button>
        </div>
        <div className="my-6">
          <span className="text-text mr-4 ">Period:</span>
          <Period period={period} setPeriod={setPeriod} />
        </div>
        <div>
          <section className="col-span-2 border-solid border-2 border-zinc-700 rounded-lg justify-center px-2 py-2 bg-secondary my-4">
            <TransactionChart
              transactionDays={transactionDays}
              transactions={transactions}
              period={period}
            />
          </section>

          <article className="flex-none  md:block">
            <section
              id="category-graph"
              className="col-span-2 border-solid border-2 border-zinc-700 rounded-lg justify-center px-2 py-2 bg-secondary my-4"
            >
              <CategoryChart
                transactionDays={transactionDays}
                transactions={transactions}
                period={period}
              />
            </section>

            <section
              id="category-graph"
              className="col-span-2 border-solid border-2 border-zinc-700 rounded-lg justify-center px-2 py-2 bg-secondary my-4"
            >
              <ImportanceChart
                transactionDays={transactionDays}
                transactions={transactions}
                period={period}
              />
            </section>
          </article>
        </div>
      </div>
    </>
  );
}

export default Overview;
