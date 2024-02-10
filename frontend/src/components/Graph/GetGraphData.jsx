import React, { useState } from "react";
import {Button} from '../../components'
import Graph from "./Graph";

const GetGraphData = () => {
  const [formData, setFormData] = useState({
    subject: "",
    marks: "",
    maxMarks: "",
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  let labelMonths = [];
  for (let i = currentMonth + 1; i < 12; i++) {
    labelMonths.push(months[i] + " " + (currentYear - 1));
  }
  for (let i = 0; i < currentMonth + 1; i++) {
    labelMonths.push(months[i] + " " + currentYear);
  }

  const studentData = {
    labels: labelMonths,
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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col gap-2">
      <Graph data={studentData} />
      <h5 className="text-md underline text-zinc-400 underline-offset-4">Add data</h5>
      <form className="flex justify-around max-md:flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="inputdata"
            value={formData.subject}
            onChange={handleChange}
          />
          <input
            type="text"
            name="marks"
            placeholder="Marks Obtained"
            className="inputdata"
            value={formData.marks}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="maxMarks"
            placeholder="Maximum Marks"
            className="inputdata"
            value={formData.maxMarks}
            onChange={handleChange}
          />
          <Button variant="gradient" text="Add data"/>
        </div>
      </form>
    </div>
  );
};

export default GetGraphData;
