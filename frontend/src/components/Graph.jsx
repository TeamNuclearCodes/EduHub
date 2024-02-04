import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
// import "../App.css";

const Graph = () => {
  const studentData = {
    labels: [
      "Jan 24",
      "Feb 24",
      "Mar 23",
      "Apr 23",
      "May 23",
      "Jun 23",
      "Jul 23",
      "Aug 23",
      "Sep 23",
      "Oct 23",
      "Nov 23",
      "Dec 23",
    ],
    datasets: [
      {
        label: "Maths",
        data: [95, 90, 80, 85, 70, 75, 60, 80, 80, 70, 75, 65],
        borderColor: "#1f72de",
      },
      {
        label: "Physics",
        data: [90, 90, 65, 60, 75, 80, 83, 65, 60, 85, 80, 75],
        borderColor: "#cf1f1f",
      },
    ],
  };
  return (
    <div className="shadow-[2px_2px_4px_rgba(0,0,0,0.2)] bg-[#f0f0f0] w-[60vw] ml-5 mt-5 pl-5 rounded-lg;">
      <Line data={studentData} />
    </div>
  );
};

export default Graph;
