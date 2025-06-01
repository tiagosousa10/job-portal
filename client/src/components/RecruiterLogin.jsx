import React from "react";
import { assets } from "../assets/assets";

const RecruiterLogin = () => {
  const [state, setState] = React.useState("Login");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [image, setImage] = React.useState(false);

  const [isTextDataSubmitted, setIsTextDataSubmitted] = React.useState(false);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center ">
      <form className="relative bg-white p-10 rounded-xl text-slate-500">
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>
        {state === "Sign Up" && isTextDataSubmitted ? (
          <></>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none text-sm"
                  type="text"
                  placeholder="Company Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none text-sm"
                type="email"
                placeholder="Email Id"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm"
                type="password"
                placeholder="*********"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </>
        )}

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot Password?
        </p>

        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === "Login" ? "Login" : "Sign Up"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default RecruiterLogin;
