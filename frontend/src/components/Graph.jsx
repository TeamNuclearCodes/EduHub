import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
// import "../App.css";

const Graph = ({ data }) => {
  return (
    <div className="shadow-[2px_2px_4px_rgba(0,0,0,0.2)] bg-[#f0f0f0] w-[60vw] ml-5 mt-5 pl-5 rounded-lg;">
      <Line data={data} />
    </div>
  );
};

export default Graph;
