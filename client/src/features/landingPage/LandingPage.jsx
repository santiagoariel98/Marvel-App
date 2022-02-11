import React from "react";
import { Link } from "react-router-dom";
import video from "../../video/Marvel Opening.mp4";

function LandingPage() {
  return (
    <div className="py-16 w-screen h-screen relative">
      <div className="flex flex-col text-white justify-center items-center text-center h-full w-full md:text-left md:items-start md:pl-8 z-[2]">
        <p className="uppercase tracking-loose w-full">Marvel APP</p>
        <h1 className="my-4 text-5xl font-bold leading-tight max-w-[7.5em]">
          Search and Explore Marvel Universe
        </h1>
        <Link
          to="/home"
          className="bg-white text-black px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all"
        >
          Get Started
        </Link>
      </div>
      <div className="absolute w-full h-full bg-black/80 inset-0 -z-[1]"></div>
      <video
        src={video}
        muted
        loop
        autoPlay
        className="absolute top-0 bottom-0 left-0 w-full h-full object-cover -z-10 bg-black"
        type="video/mp4"
      ></video>
    </div>
  );
}

export default LandingPage;
