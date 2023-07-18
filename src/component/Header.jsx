import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full h-[4rem]  shadow-sm px-2 ">
      <div className="flex justify-between items-center  py-4">
        <div>
          <Link to="/">
            <h1 className="text-blue-600 hover:text-blue-500 cursor-pointer text-lg font-bold ">
              Hacker News
            </h1>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Link to="/post">
            <h1 className="text-blue-600  hover:font-bold cursor-pointer text-md font-semibold">
              Post
            </h1>
          </Link>
          <Link to="/new-post">
            <h1 className="text-blue-600 cursor-pointer text-md font-semibold hover:font-bold">
              New Post
            </h1>
          </Link>
          <Link to="/messages">
            <h1 className="bg-blue-600 text-white p-2 rounded-md cursor-pointer text-md font-semibold hover:font-medium">
              Messages
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
