import React, { useEffect } from "react";
// components
import CardList from "../components/CardList";
import "react-multi-carousel/lib/styles.css";
import Loading from "../components/Loading";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

//redux
import { getCharacterByIdAsync } from "../features/character/characterSlice";

function CharactersDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const info = useSelector((state) => state.characters.currentCharacter);
  const status = useSelector((state) => state.characters.status);
  console.log(info);
  useEffect(() => {
    if (!info.data || +info.data.id !== +id)
      dispatch(getCharacterByIdAsync(id));
  }, [id, dispatch, info.data]);

  return (
    <div className="bg-black">
      {status === "loading" ? <Loading /> : <></>}

      {info && info.data && info.success ? (
        <>
          <section className="relative h-screen overflow-y-hidden">
            <div className="lg:rounded-sm">
              <img
                src={info.data.img}
                alt={info.data.name ? info.data.name : info.data.title}
                className="w-screen mx-auto object-cover pt-16 lg:w-[35em] lg:h-[35em] lg:object-contain lg:rounded-sm lg:pt-20 lg:mr-8 "
              />
            </div>
            <div className="px-4 text-white text-left w-screen pt-4 absolute pb-4 min-h-[11em] bg-black lg:top-[40%] lg:bg-transparent lg:left-0 lg:max-w-[35em]">
              <h1 className="text-2xl font-bold mb-2 lg:text-[3em] lg:mb-8">
                {info.data.name}
              </h1>
              <div className="mb-4">
                {info.data.desc ? (
                  <>
                    <div className="text-sm lg:text-[1.5em]">
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
            <section className="bg-white py-2">
              <h1
                id="comics"
                className="text-center text-black text-[2em] font-bold pt-16"
              >
                Comics
              </h1>
              <div className="lg:auto-rows-[21rem] grid gap-4 grid-flow-dense auto-rows-[12rem] grid-cols-menu lg:grid-cols-menu2 w-full place-items-center">
                {info.data.comics.data.length ? (
                  info.data.comics.data.map((comic) => (
                    <CardList key={comic.id} data={comic} type={"comics"} />
                  ))
                ) : (
                  <></>
                )}
              </div>
              {info.data.comics.pages > 1 ? (
                <Link
                  to="comics"
                  className="h-max mt-4 flex text-center mx-auto w-max py-1 px-2 rounded-md shadow-md text-white mx-auto bg-cyan-500 "
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
          {/* events */}
          {info.data.totalEvents > 0 ? (
            <section className="bg-white py-2">
              <h1
                id="events"
                className="text-center text-black text-[2em] font-bold pt-16"
              >
                Events
              </h1>
              <div className="lg:auto-rows-[21rem] grid gap-4 grid-flow-dense auto-rows-[12rem] grid-cols-menu lg:grid-cols-menu2 w-full place-items-center">
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
              <div className="lg:auto-rows-[21rem] grid gap-4 grid-flow-dense auto-rows-[12rem] grid-cols-menu lg:grid-cols-menu2 w-full place-items-center">
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
