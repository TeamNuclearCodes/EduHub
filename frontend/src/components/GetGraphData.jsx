import React, { useState } from "react";

const GetGraphData = () => {
  const [formData, setFormData] = useState({
    subject: "",
    marks: 0,
    maxMarks: 0,
  });

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
