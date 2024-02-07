import React, { useState } from "react";
import Graph from "./Graph";

const GetGraphData = () => {
  const [formData, setFormData] = useState({
    subject: "",
    marks: 0,
    maxMarks: 0,
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
    <div>
      <Graph data={studentData} />
      <form onSubmit={handleSubmit}>
        <label>
          Subject:
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </label>
        <label>
          Marks Obtained:
          <input
            type="number"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
          />
        </label>
        <label>
          Maximum Marks:
          <input
            type="number"
            name="maxMarks"
            value={formData.maxMarks}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GetGraphData;
