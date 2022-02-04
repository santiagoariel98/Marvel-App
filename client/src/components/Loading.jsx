import React from "react";

function Loading() {
  return (
    <div className="fixed w-screen h-screen bg-red-500 z-[9999]">
      <div className="loading w-[200px] h-16 fixed left-1/2 top-1/2 z-[99999] -translate-x-1/2 -translate-y-1/2">
        <div className="w-[20px] h-[20px] absolute rounded-full bg-white left-1/4 origin-[50%] z-1 animate-circle"></div>
        <div className="w-[20px] h-[20px] absolute rounded-full bg-white left-[45%] origin-[50%] z-1 animate-circle"></div>
        <div className="w-[20px] h-[20px] absolute rounded-full bg-white left-[65%] origin-[50%] z-1 animate-circle"></div>
        <div className="w-[20px] h-[4px] rounded-full bg-black/50 absolute top-[62px] origin-[50%] z-[-1] left-1/4 animate-shadow blur-[1px]"></div>
        <div className="w-[20px] h-[4px] rounded-full bg-black/50 absolute top-[62px] origin-[50%] z-[-1] left-[45%] animate-shadow blur-[1px]"></div>
        <div className="w-[20px] h-[4px] rounded-full bg-black/50 absolute top-[62px] origin-[50%] z-[-1] left-[65%] animate-shadow blur-[1px]"></div>
        <span className="absolute top-[75px] font-['Lato'] text-xl tracking-[12px] text-white left-[15%]">
          Loading
        </span>
      </div>
    </div>
  );
}

export default Loading;
