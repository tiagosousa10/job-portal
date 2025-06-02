import React, { useEffect } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";

const AddJob = () => {
  const [title, setTitle] = React.useState("");
  const [location, setLocation] = React.useState("Bangalore");
  const [category, setCategory] = React.useState("Programming");
  const [level, setLevel] = React.useState("Beginner Level");
  const [salary, setSalary] = React.useState(0);

  const editorRef = React.useRef(null);
  const quillRef = React.useRef(null);

  useEffect(() => {
    //Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <form>
      <div>
        <p>Job Title</p>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>

      <div>
        <p>Job Description</p>
        <div ref={editorRef}></div>
      </div>

      <div>
        <div>
          <p>Job Category</p>
          <select onChange={(e) => setCategory(e.target.value)}>
            {JobCategories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p>Job Location</p>
          <select onChange={(e) => setLocation(e.target.value)}>
            {JobLocations.map((location, index) => (
              <option value={location} key={index}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p>Job Level</p>
          <select onChange={(e) => setLevel(e.target.value)}>
            <option value="Beginner Level">Beginner Level</option>
            <option value="Intermediate Level">Intermediate Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
      </div>

      <div>
        <p>Job Salary</p>
        <input
          type="number"
          placeholder="2500"
          onChange={(e) => setSalary(e.target.value)}
          value={salary}
        />
      </div>

      <button>ADD</button>
    </form>
  );
};

export default AddJob;
