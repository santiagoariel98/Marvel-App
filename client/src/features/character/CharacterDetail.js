import React, { useEffect } from "react";
// components
import Loading from "../../components/Loading";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//redux
import { getCharacterByIdAsync } from "./characterSlice";
import Detail from "../../components/Detail";

function CharacterDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const info = useSelector((state) => state.characters.currentCharacter);
  const status = useSelector((state) => state.characters.status.general);
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
            <Detail
              info={info.data.events}
              type={"characters"}
              datatype={"events"}
              id={id}
            />
          ) : (
            <></>
          )}
          {/* series */}
          {info.data.totalSeries > 0 ? (
            <Detail
              info={info.data.series}
              type={"characters"}
              datatype={"series"}
              id={id}
            />
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

export default CharacterDetail;
