import React from "react";
import { Link } from "react-router-dom";
import video from "../../video/Marvel Opening.mp4";

function LandingPage() {
  return (
    <div className="pt-24 w-full h-full">
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center text-white">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <video
            src={video + "#t=3,37"}
            muted
            loop
            autoPlay
            className="absolute top-0 bottom-0 left-0 w-full h-full object-cover -z-10 bg-black"
            type="video/mp4"
          ></video>
          <p className="uppercase tracking-loose w-full">Marvel APP</p>
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Search and Explore Marvel Universe
          </h1>
          <p className="leading-normal text-2xl mb-8"> New Comics</p>
          <Link
            to="/home"
            className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
