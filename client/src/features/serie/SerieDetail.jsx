import React, { useEffect } from "react";
// components
import Loading from "../../components/Loading";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//redux
import { getDataById } from "./serieSlice";
import Detail from "../../components/Detail";

function SerieDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const info = useSelector((state) => state.series.currentSerie);
  const status = useSelector((state) => state.series.status.general);

  useEffect(() => {
    if (!info.data || +info.data.id !== +id)
      dispatch(getDataById({ type: "series", id }));
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
                className="w-screen mx-auto object-cover pt-16 md:w-[35em] md:h-[35em] md:object-contain md:rounded-sm md:pt-20 md:mr-8 md:absolute md:right-0 md:top-0 md:bottom-0 md:my-auto"
              />
            </div>
            <div className="px-4 text-white text-left w-screen pt-4 absolute pb-4 min-h-[11em] bg-black md:bottom-0 md:top-0 md:my-auto md:bg-transparent md:left-0 md:max-w-[35em] bottom-0 md:flex md:flex-col md:justify-center">
              <h1 className="text-2xl font-bold mb-2 md:text-[3em] md:mb-8 leading-8">
                {info.data.name ? info.data.name : info.data.title}
              </h1>
              <div className="mb-4 leading-8">
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
              <div className="flex justify-between text-white md:max-w-[20em]">
                {info.data.totalCharacters > 0 ? (
                  <a href="#characters" className="bg-red-500 px-4 py-2">
                    Characters
                  </a>
                ) : (
                  <></>
                )}
                {info.data.totalCreators > 0 ? (
                  <a href="#creators" className="bg-red-500 px-4 py-2">
                    Creators
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
                {info.data.totalComics > 0 ? (
                  <a href="#comics" className="bg-red-500 px-4 py-2">
                    Comics
                  </a>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </section>
          {/* characters */}
          {info.data.totalCharacters > 0 ? (
            <Detail
              info={info.data.characters}
              type={"series"}
              datatype={"characters"}
              id={id}
            />
          ) : (
            <></>
          )}
          {/* comics */}
          {info.data.totalComics > 0 ? (
            <Detail
              info={info.data.comics}
              type={"series"}
              datatype={"comics"}
              id={id}
            />
          ) : (
            <></>
          )}
          {/* creators */}
          {info.data.totalCreators > 0 ? (
            <Detail
              info={info.data.creators}
              type={"series"}
              datatype={"creators"}
              id={id}
            />
          ) : (
            <></>
          )}
          {/* events */}
          {info.data.totalEvents > 0 ? (
            <Detail
              info={info.data.events}
              type={"series"}
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
              type={"series"}
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

export default SerieDetail;
