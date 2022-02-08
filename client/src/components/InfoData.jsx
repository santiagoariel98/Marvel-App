import React from "react";
import Buttons from "./Buttons";

function InfoData({ data }) {
  return (
    <section className="relative h-screen overflow-y-hidden">
      <div className="md:rounded-sm">
        <img
          src={data.img}
          alt={data.name || data.title || data.fullname}
          className="w-screen mx-auto object-cover pt-16 md:w-[35em] md:h-[35em] md:object-contain md:rounded-sm md:pt-20 md:mr-8 "
        />
      </div>
      <div className="px-4 text-white text-left w-screen pt-4 absolute pb-4 min-h-[11em] bg-black md:top-[40%] md:bg-transparent md:left-0 md:max-w-[35em]">
        <h1 className="text-2xl font-bold mb-2 md:text-[3em] md:mb-8">
          {data.name || data.title || data.fullname}
        </h1>
        <div className="mb-4">
          {data.desc ? (
            <>
              <div className="text-sm md:text-[1.5em]">{data.desc}</div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-between text-white max-w-[20em]">
          <Buttons data={data} />
        </div>
      </div>
    </section>
  );
}

export default InfoData;
