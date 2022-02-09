import React from "react";
import Buttons from "./Buttons";

function Masthead({ type, data = [] }) {
  const width = Math.floor(100 / data.length);
  return (
    <section
      id={`#${type}`}
      className="w-screen h-screen bg-black relative overflow-x-hidden"
    >
      {data.length === 1 ? (
        <div className="md:flex md:flex-col md:justify-center px-8 text-white text-left bottom-0 md:top-0 md:my-auto absolute bg-black/90 md:bg-transparent md:left-0 md:max-w-[35em] z-[35] min-h-[25vh] py-4 w-screen">
          <h1 className="md:text-[3em] text-[1.5em]">
            {data[0].name || data[0].title || data[0].fullname || "X"}
          </h1>
          <p className="md:text-[1em] text-[0.8em]">{data[0].desc}</p>
          <div className="flex justify-between text-white max-w-[20em] pt-4">
            <Buttons data={data[0]} />
          </div>
        </div>
      ) : (
        <div className="absolute text-white bottom-0 top-0 m-auto text-center w-max h-max left-0 right-0  font-bold uppercase z-[35]">
          <h1 className="md:text-[3em] text-[1.5em]">Marvel {type}</h1>
          <p className="text-[1em]">Explore {type}</p>
        </div>
      )}
      {data.length > 1 ? (
        <div className="w-screen h-screen bg-black/70 z-[34] absolute"></div>
      ) : (
        <></>
      )}

      {data.length === 1 ? (
        <div className="absolute top-0 bottom-0 md:flex items-center pt-4 right-0 md:px-16">
          <img
            src={data[0].img}
            alt={data[0].title || data[0].name || data[0].fullname}
            className="w-screen md:max-w-[30em] h-[70vh] object-cover"
          />
        </div>
      ) : data.length > 1 ? (
        <div className="absolute flex select-none inset-0 items-center mx-auto justify-center">
          {data.map((e, i) => (
            <img
              key={e.id || i}
              src={e.img}
              className={`w-[${width}vw] h-[80vh] object-cover select-none blur-[2px] pt-4`}
              alt={e.title || e.name || e.fullname}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}

export default Masthead;
