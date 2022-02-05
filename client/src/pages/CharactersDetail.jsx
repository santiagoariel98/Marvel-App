import React, { useEffect, useState } from "react";
// components
import CardList from "../components/CardList";
import "react-multi-carousel/lib/styles.css";
import Loading from "../components/Loading";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

//redux
import {
  getCharacterByIdAsync,
  getDatatypeInfo,
} from "../features/character/characterSlice";
import { Pagination } from "@mui/material";
import Detail from "../components/Detail";

function CharactersDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const handleChange = (e, value) => {
    setPage(value);
    if (value !== page) {
      console.log("ok");
      dispatch(
        getDatatypeInfo({
          type: "characters",
          id,
          datatype: "comics",
          pages: value,
        })
      );
    }
  };

  const info = useSelector((state) => state.characters.currentCharacter);

  useEffect(() => {
    if (!info.data || +info.data.id !== +id)
      dispatch(getCharacterByIdAsync(id));
  }, [id, dispatch, info.data]);

  return (
    <div className="bg-black">
      {info && info.data && info.success ? (
        <>
          <section className="relative h-screen overflow-y-hidden">
            <div className="md:rounded-sm">
              <img
                src={info.data.img}
                alt={info.data.name ? info.data.name : info.data.title}
                className="w-screen mx-auto object-cover pt-16 md:w-[35em] md:h-[35em] md:object-contain md:rounded-sm md:pt-20 md:mr-8 "
              />
            </div>
            <div className="px-4 text-white text-left w-screen pt-4 absolute pb-4 min-h-[11em] bg-black md:top-[40%] md:bg-transparent md:left-0 md:max-w-[35em]">
              <h1 className="text-2xl font-bold mb-2 md:text-[3em] md:mb-8">
                {info.data.name}
              </h1>
              <div className="mb-4">
                {info.data.desc ? (
                  <>
                    <div className="text-sm md:text-[1.5em]">
                      {info.data.desc}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex justify-between text-white max-w-[20em]">
                {info.data.totalComics > 0 ? (
                  <a href="#comics" className="bg-red-500 px-4 py-2">
                    Comics
                  </a>
                ) : (
                  <></>
                )}
                {info.data.totalEvents > 0 ? (
                  <a href="#events" className="bg-red-500 px-4 py-2">
                    Events
                  </a>
                ) : (
                  <></>
                )}
                {info.data.totalSeries > 0 ? (
                  <a href="#series" className="bg-red-500 px-4 py-2">
                    Series
                  </a>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </section>
          {info.data.totalComics > 0 ? (
            <Detail
              info={info.data.comics}
              type={"characters"}
              datatype={"comics"}
              id={id}
            />
          ) : (
            <></>
          )}
          {/* events */}
          {info.data.totalEvents > 0 ? (
            <section className="bg-white py-2">
              <h1
                id="events"
                className="text-center text-black text-[2em] font-bold pt-16"
              >
                Events
              </h1>
              <div className="md:auto-rows-[21rem] grid gap-4 grid-flow-dense auto-rows-[12rem] grid-cols-menu md:grid-cols-menu2 w-full place-items-center">
                {info.data.events.data.length ? (
                  info.data.events.data.map((comic) => (
                    <CardList key={comic.id} data={comic} type={"events"} />
                  ))
                ) : (
                  <></>
                )}
              </div>
              {info.data.events.pages > 1 ? (
                <Link
                  to="events"
                  className="h-max  mt-4 flex text-center mx-auto w-max py-1 px-2 rounded-md shadow-md text-white mx-auto bg-cyan-500 "
                >
                  See more
                </Link>
              ) : (
                <></>
              )}
            </section>
          ) : (
            <></>
          )}
          {/* series */}
          {info.data.totalSeries > 0 ? (
            <section className="bg-white py-2">
              <h1
                id="series"
                className="text-center text-black text-[2em] font-bold pt-16"
              >
                Series
              </h1>
              <div className="md:auto-rows-[21rem] grid gap-4 grid-flow-dense auto-rows-[12rem] grid-cols-menu md:grid-cols-menu2 w-full place-items-center">
                {info.data.series.data.length ? (
                  info.data.series.data.map((comic) => (
                    <CardList key={comic.id} data={comic} type={"series"} />
                  ))
                ) : (
                  <></>
                )}
              </div>
              {info.data.series.pages > 1 ? (
                <Link
                  to="series"
                  className="h-max  mt-4 flex text-center mx-auto w-max py-1 px-2 rounded-md shadow-md text-white mx-auto bg-cyan-500 "
                >
                  See more
                </Link>
              ) : (
                <></>
              )}
            </section>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CharactersDetail;
