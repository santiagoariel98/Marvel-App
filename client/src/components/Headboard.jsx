import React from "react";
import { useEffect } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useDispatch, useSelector } from "react-redux";
import { getData, getRandomData } from "../features/character/characterSlice";
import Card from "./Card";
import Masthead from "./Masthead";
import Search from "./Search";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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

function Headboard({ type, cb }) {
  const dispatch = useDispatch();

  const headboard = useSelector((state) => state[type].headboard);
  const info = useSelector((state) => state[type].results);

  useEffect(() => {
    if (!headboard.length) {
      dispatch(getRandomData({ type }));
      dispatch(getData({ type }));
    }
  }, [dispatch, headboard, type]);

  return (
    <div className="overflow-hidden">
      <Masthead type={type} data={headboard} />

      <h1 className="uppercase md:text-[2em] text-[1.5em] mx-auto text-center text-white pt-4 font-bold">
        discover new {type}
      </h1>
      <section className="w-screen overflow-x-hidden">
        <Carousel
          ssr
          partialVisibile
          itemClass="image-item"
          responsive={responsive}
        >
          {headboard.length ? (
            headboard.map((data) => (
              <Card type={type} data={data} key={data.id} />
            ))
          ) : (
            <></>
          )}
        </Carousel>
      </section>

      <Search info={info} type={type} cb={{ getData }} />
    </div>
  );
}

export default Headboard;
