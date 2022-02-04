import React from "react";
import { Link } from "react-router-dom";

function Card({ data, type }) {
  return (
    <div
      key={data.id}
      className="relative my-8 sm:mx-2 mx-6 w-64 h-72 shadow-md transition-all duration-500 cursor-pointer hover:scale-110 group first:sm:ml-12 first:ml-12 last:sm:mr-2 last:mr-16"
    >
      {type === "comics" ? (
        <div className="w-full h-full absolute overflow-hidden group-hover:bg-black/50 rounded-md group-active:bg-transparent">
          {/* <div class="cr cr-bottom cr-right cr-sticky cr-green">Hello</div> */}
          <div className="opacity-0 transition-all border-y-2 border-gray-300 group-hover:opacity-100 w-48 px-4 py-1 text-center absolute text-blue bottom-5 -right-14 fixed -rotate-45 bg-red-500 overflow-hidden text-white">
            {data.price > 0 ? "$" + data.price : "FREE"}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="rounded-md w-64 h-72">
        <img
          src={data.img}
          alt={data.title ? data.title : data.name}
          className="object-cover rounded-md h-full w-full"
        />
      </div>
      {data.title && type !== "comics" && data.desc ? (
        <div className="h-full opacity-0 top-0 text-white bottom-0 px-2 text-sm items-center absolute top-0 flex justify-center left-0 right-0 my-0 mx-auto bg-lightgray transition-all group-hover:opacity-100 group-hover:bg-black/90 pt-4 group-active:opacity-0 rounded-md">
          {data.desc}
        </div>
      ) : (
        <></>
      )}

      <div className="h-12 text-center font-bold text-base items-center absolute top-0 flex justify-center left-0 right-0 my-0 mx-auto bg-lightgray opacity-0 transition-all group-hover:opacity-100 group-hover:bg-white group-hover:top-5 border-y-2 border-gray-300 group-active:opacity-0">
        <p>{data.title ? data.title : data.name}</p>
      </div>
      <Link
        to={`/${type}/${data.id}`}
        className="h-7 text-center -z-[50] text-base items-center absolute bottom-0 w-max py-0 px-2 rounded-md flex justify-center left-0 right-0 shadow-md text-white my-0 mx-auto bg-cyan-500 opacity-0 transition-all group-hover:opacity-100 group-hover:z-[1] group-hover:bottom-5"
      >
        <p>+ info</p>
      </Link>
    </div>
  );
}

export default Card;
