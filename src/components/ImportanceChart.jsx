import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { useEffect } from "react";

Chart.register(CategoryScale);

export default function ImportanceChart({
  transactionDays,
  transactions,
  period,
}) {
  console.log("CHart Data", transactions);

  const [chartData, setChartData] = useState({
    labels: transactionDays,
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
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: transactionDays,
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
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    });
  }, [transactions]);
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }} className="text-white">
        Line Chart
      </h2>
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
          indexAxis: "y",
          responsive: true,
          scales: {
            x: {
              grid: {
                color: "#626262",
                borderColor: "red",
              },
            },
            y: {
              grid: {
                color: "#626262",
                borderColor: "green",
              },
            },
          },
        }}
      />
    </div>
  );
}
