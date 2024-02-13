import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";

const Graph = ({ data }) => {
  return (
    <div className="bg-gradient p-[1px] rounded-lg">
      <div className="shadow-[2px_2px_4px_rgba(0,0,0,0.2)] bg-zinc-950 rounded-lg">
        <Line
          data={data}
          options={{
            borderColor: "#fff",
            color: "#fff",
          }}
        />
      </div>
    </div>
  );
};

export default Graph;
