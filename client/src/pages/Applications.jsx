import React from "react";
import Navbar from "../components/Navbar";
const Applications = () => {
  const [isEdited, setIsEdited] = React.useState(false);
  const [resume, setResume] = React.useState(null);

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-2xl font-semibold ">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdited ? (
            <>
              <label htmlFor="">
                <p>Select Resume</p>
                <input type="text" accept="application/pdf" />
              </label>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                href=""
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdited(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Applications;
