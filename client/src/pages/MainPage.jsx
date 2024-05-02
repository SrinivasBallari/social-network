import React from "react";
import { names, blogs } from "../Helpers/data";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="w-full h-full flex-col gap-2 items-center bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center">
      <div className="mt-10 mb-6 flex gap-4 ">
        <button className="border px-5 py-2 rounded-md shadow-2xl text-blue-500 bg-white">
          {" "}
          Post
        </button>
        <button className="border px-5 py-2 rounded-md shadow-2xl text-blue-500 bg-white">
          Ask Question{" "}
        </button>
        <button className="border px-5 py-2 rounded-md shadow-2xl text-blue-500 bg-white">
          <Link>Logout</Link>
        </button>
      </div>
      <div className="flex gap-10" >
      <div className="flex flex-col gap-3">
        {names.map((item, index) => (
          <div
            key={index}
            className="flex justify-center gap-4 px-20  w-[500px] relative items-center rounded-xl h-[120px] bg-white shadow-xl max-[768px]:mx-2"
          >
            <h1 className="w-2/3 border py-2 px-2 rounded-md shadow-lg">
              {item.name}
            </h1>
            <button className="border px-5 rounded-md shadow-2xl bg-blue-500 py-2 text-white">
              Add Freinds
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {blogs.map((item, index) => (
          <div
            key={index}
            className="flex  flex-col justify-center gap-4 px-20  w-[600px] relative items-center rounded-xl h-[250px] bg-white shadow-xl max-[768px]:mx-2"
          >
            <h1 className="w-2/3 border py-2 px-2 rounded-md shadow-lg">
              Tilte : {item.title}
            </h1>
            <h1 className="w-full border py-2 px-2 rounded-md shadow-lg">
              Content : {item.content}
            </h1>
            <span className="font-bold">Posted by : {item.posted_by}</span>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default MainPage;
