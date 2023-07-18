import React from "react";
import { Link } from "react-router-dom";

const Poost = ({ id, body, index, title, date, thamnail }) => {
  return (
    <Link
      to={`/post/${id}`}
      className={` min-h-full ${index == 0 && "md:col-start-1 "} ${
        index == 0 && "md:col-end-3"
      } 
     ${index == 0 && "md:row-start-1"} ${
        index == 0 && "md:row-end-3"
      }  cursor-pointer relative rounded-[5px] col-span-2 md:col-span-1`}
      style={{
        backgroundImage: `url(${thamnail})`,
        // background: "linear-gradient(0deg,rgba(0,0,0,0.7),rgba(0,0,0,0) 60%,rgba(0,0,0,0))" ,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute bottom-0  left-0 w-full flex justify-between flex-col p-[1rem] text-white">
        <div className="inline-block rounded-[10px] mb-[5px]">
          <span className="bg-[#3F45D1] rounded-[5px] px-[15px] py-[5px]  text-[14px]">
            Coding
          </span>
        </div>
        <span
          className={`${
            index === 0 ? "text-[24px] font-[700]" : "text-[14px] font-[500]"
          }`}
        >
          {title}
        </span>
        {index == 0 && (
          <div>
            <span className="">Abdikadir qulle</span>
            <span>{new Date(date).toDateString()}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Poost;
