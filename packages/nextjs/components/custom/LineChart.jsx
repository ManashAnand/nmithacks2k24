"use client";

import React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

const LineChart = ({ historicalData,coin }) => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    // console.log(historicalData)
    console.log(coin)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    aspectRatio: 2,
  };

  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        label: "Mobile User",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: "PC User",
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  };

  return (
    <>
      <div className=" w-full ">
        <Line
        // style={{width:"240rem"}}
          data={{
            // labels: historicalData?.map(coin => {
            //   let date = new Date(coin[0]);
            //   let time =
            //     date.getHours() > 12
            //       ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            //       : `${date.getHours()}:${date.getMinutes()} AM`;
            //   return  date.toLocaleDateString();
            // }),
            labels:historicalData?.map((item) => {
                // console.log(item[0])
                return (
                    item[0]
                )
            }),
            datasets: [
              {
                data: historicalData?.map(coin => coin[1]),
                label: `Price (Past 30 Days ) in INR`,
                borderColor: "#EEBC1D",
                // borderColor: "lime",
              },
            ],
          }}
        />
      </div>
    </>
  );
};

export default LineChart;
