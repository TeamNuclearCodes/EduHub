import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
// import "../App.css";

const Graph = ({ data }) => {
  return (
    <div className="shadow-[2px_2px_4px_rgba(0,0,0,0.2)] bg-zinc-950 rounded-lg">
      <Line data={data}
        options= {{
          borderColor:'#fff',
          color: '#fff'
        }}
      />
    </div>
  );
};

export default Graph;