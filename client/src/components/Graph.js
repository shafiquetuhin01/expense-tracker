import { ArcElement, Chart } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import Labels from "./Labels";

Chart.register(ArcElement);

const config = {
  data: {
    datasets: [
      {
        data: [100, 100, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
        borderRadius:25,
        spacing:5
      },
    ],
  },
  options:{
    cutout:115
  }
};
export default function Graph() {
  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart1 relative">
          <Doughnut {...config}></Doughnut>
          <h3 className="mb-4 font-bold title">Total <span className="block text-3xl text-cyan-400">${0}</span></h3>
        </div>

        <div className="flex flex-col py-10 gap-4">
            {/* Lables  */}
            <Labels></Labels>
            </div>
      </div>
    </div>
  );
}
