import React, { useState } from "react";
import { Button } from "..";
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

  // const genData = (formData) => {
  //   return {
  //     labels: formData.map((data) => data["date"]),
  //     datasets: [
  //       {
  //         label: "LAC",
  //         data: formData.map(
  //           (data) =>
  //             data["subject"] === "LAC" && data["marks"] / data["maxMarks"]
  //         ),
  //         borderColor: "#1f72de",
  //       },
  //       {
  //         label: "Chemistry",
  //         data: formData?.map(
  //           (data) =>
  //             data["subject"] === "Chemistry" &&
  //             data["marks"] / data["maxMarks"]
  //         ),
  //         borderColor: "#cf1f1f",
  //       },
  //     ],
  //   };
  // };

  const genData = (formData) => {
    return {
      labels: [
        "05-12-2023",
        "13-12-2023",
        "22-12-2023",
        "05-01-2024",
        "17-01-2024",
        "25-01-2024",
        "02-02-2024",
        "14-02-2024",
      ],
      datasets: [
        {
          label: "LAC",
          data: [67, 73, 85, 76, 80, 90, 92, 87],
          borderColor: "#1f72de",
        },
        {
          label: "Chemistry",
          data: [78, 74, 70, 66, 74, 78, 85, 82],
          borderColor: "#069e16",
        },
        {
          label: "BME",
          data: [85, 89, 83, 84, 90, 93, 91, 88],
          borderColor: "#cf1f1f",
        },
        {
          label: "BCE",
          data: [75, 80, 81, 83, 85, 81, 76, 78],
          borderColor: "#e0c424",
        },
        {
          label: "Graphics",
          data: [60, 73, 65, 78, 85, 87, 80, 73],
          borderColor: "#b51abd",
        },
      ],
    };
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
    const temp = formData;
    temp.push(newData);
    setFormData(temp);
  };

  return (
    <div className="flex flex-col gap-2">
      <Graph data={genData(formData)} />
      <h5 className="text-md underline text-zinc-400 underline-offset-4">
        Add data
      </h5>
      <form
        className="flex justify-around max-md:flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <select
            type="text"
            name="subject"
            placeholder="Subject"
            className="inputdata bg-zinc-950"
            value={newData.subject}
            onChange={handleChange}
          >
            <option value="LAC">LAC</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Graphics">Graphics</option>
            <option value="BME">BME</option>
            <option value="BCE">BCE</option>
          </select>
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
