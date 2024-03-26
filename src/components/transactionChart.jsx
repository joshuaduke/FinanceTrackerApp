import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { useEffect } from "react";

Chart.register(CategoryScale);

export default function TransactionChart({ transactions }) {
  console.log("CHart Data", transactions);

  const [chartData, setChartData] = useState({
    labels: transactions.map((data) => data.date),
    datasets: [
      {
        label: "Expenses",
        data: transactions.map((data) => data.transactionAmount),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: transactions.map((data) => data.date),
      datasets: [
        {
          label: "Expenses",
          data: transactions.map((data) => data.transactionAmount),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [transactions]);
  return (
    <div>
      <div className="chart-container">
        <h2 style={{ textAlign: "center" }}>Line Chart</h2>
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Users Gained between 2016-2020",
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
