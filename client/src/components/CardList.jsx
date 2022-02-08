import React from "react";
import { Link } from "react-router-dom";

function CardList({ data, type, status }) {
  return (
    <div
      key={data.id}
      className={`rounded-md md:w-64 md:h-80 relative my-8 sm:mx-2 mx-6 w-32 h-40 shadow-md transition-all duration-500 cursor-pointer hover:scale-110 group ${
        status === "loading" ? "animate-pulse" : ""
      }`}
    >
      <div className="rounded-md md:w-64 md:h-80 w-32 h-40">
        <img
          loading="lazy"
          src={data.img}
          alt={data.title ? data.title : data.name}
          className={`object-cover rounded-md h-full w-full mx-auto transition-all ${
            status === "loading" ? "blur-sm" : ""
          }`}
        />
      </div>

      <div className="h-max text-[0.6em] text-center font-bold items-center absolute top-0 flex justify-center left-0 right-0 my-0 mx-auto bg-lightgray opacity-0 transition-all group-hover:opacity-100 group-hover:bg-white group-hover:top-2 border-y-2 border-gray-300 group-active:opacity-0 md:text-[1em]">
        <p>{data.title ? data.title : data.name ? data.name : data.fullname}</p>
      </div>
      <Link
        to={`/${type}/${data.id}`}
        className="h-7 text-center z-[-50] text-base items-center absolute bottom-0 w-max py-0 px-2 rounded-md flex justify-center left-0 right-0 shadow-md text-white my-0 mx-auto bg-cyan-500 opacity-0 transition-all group-hover:opacity-100 group-hover:bottom-2 group-hover:z-[1]"
      >
        <p>+ info</p>
      </Link>
    </div>
  );
}

export default CardList;
