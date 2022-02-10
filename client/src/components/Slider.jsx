import React from "react";

//component
import Card from "./Card";

//react multi carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    partialVisible: 120,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisible: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisible: 30,
  },
};

function Slider({ data = [], title, id, type }) {
  return (
    <section id={id || "carousel"} className="relative w-screen bg-white">
      {title ? (
        <h1 className="uppercase md:text-[2em] text-[1.5em] mx-auto text-center text-black pt-4 font-bold">
          {title}
        </h1>
      ) : (
        <></>
      )}
      {data.length ? (
        <Carousel
          ssr
          partialVisibile
          itemClass="image-item"
          responsive={responsive}
        >
          {data.map((e) => (
            <Card type={type} data={e} key={e.id} />
          ))}
        </Carousel>
      ) : (
        <></>
      )}
    </section>
  );
}

export default Slider;
