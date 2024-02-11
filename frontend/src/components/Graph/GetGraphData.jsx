import React, { useState } from "react";
import { Button } from "../../components";
import Graph from "./Graph";
import { MdOutlineLibraryAdd } from "react-icons/md";

const GetGraphData = () => {
  const [formData, setFormData] = useState([]);
  const [newData, setNewData] = useState({
    subject: "",
    marks: "",
    maxMarks: "",
    date: null,
    color: "#cf1f1f",
  });

  let todayDate = new Date();
  todayDate = `${todayDate.getDate()}-${
    todayDate.getMonth + 1
  }-${todayDate.getFullYear()}`;

  // const studentData = {
  //   labels: formData.map(data => data['date']),
  //   datasets: [
  //     {
  //       label: "Maths",
  //       data: formData.map(data => data['subject'] === 'Maths' && data['marks']/data['maxMarks']),
  //       borderColor: "#1f72de",
  //     },
  //     {
  //       label: "Physics",
  //       data: formData.map(data => data['subject'] === 'Physics' && data['marks']/data['maxMarks']),
  //       borderColor: "#cf1f1f",
  //     },
  //   ],
  // };

  const studentData = {
    labels: [
      "07-12-2023",
      "15-12-2023",
      "22-12-2023",
      "05-01-2024",
      "11-01-2024",
      "20-01-2024",
      "02-02-2024",
    ],
    datasets: [
      {
        label: "LAC",
        data: [75, 85, 90, 87, 95, 80, 90],
        borderColor: "#1f72de",
      },
      {
        label: "Engg Graphics",
        data: [75, 70, 75, 70, 80, 90, 85],
        borderColor: "#cf1f1f",
      },
      {
        label: "Chemistry",
        data: [80, 73, 69, 76, 72, 83, 89],
        borderColor: "#027011",
      },
    ],
  };

  const handleChange = (event) => {
    setNewData({
      ...newData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewData(
      (newData["date"] = newData["date"].split("-").reverse().join("-"))
    );
    console.log(newData);
    setFormData(formData.push(newData));
  };

  return (
    <div className="flex flex-col gap-2">
      <Graph data={studentData} />
      <h5 className="text-md underline text-zinc-400 underline-offset-4">
        Add data
      </h5>
      <form
        className="flex justify-around max-md:flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="inputdata bg-zinc-950"
            value={newData.subject}
            onChange={handleChange}
          />
          <input
            type="text"
            name="marks"
            placeholder="Marks Obtained"
            className="inputdata bg-zinc-950"
            value={newData.marks}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="maxMarks"
            placeholder="Maximum Marks"
            className="inputdata bg-zinc-950"
            value={newData.maxMarks}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            placeholder="Date of Assessment"
            defaultValue={todayDate}
            className="inputdata bg-zinc-950"
            value={newData.date}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2 item-center justify-center">
          <label className="flex items-center gap-1 text-slate-500 text-sm">
            Colour
            <input
              type="color"
              name="color"
              className="bg-zinc-950 rounded-sm border-none outline-none"
              value={newData.color}
              onChange={handleChange}
            />
          </label>
          <Button
            variant="gradient"
            text="Add data"
            leftIcon={<MdOutlineLibraryAdd />}
          />
        </div>
      </form>
    </div>
  );
};

export default GetGraphData;
