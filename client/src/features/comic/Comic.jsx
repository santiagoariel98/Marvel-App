import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, getRandomData } from "./comicSlice";
import { getLastComics, getNewsComics } from "../home/homeSlice";
//component
import Search from "../../components/Search";
import Masthead from "../../components/Masthead";
import Slider from "../../components/Slider";

function Comic({ type }) {
  const dispatch = useDispatch();

  const header = useSelector((state) => state[type].headboard);
  const newsComics = useSelector((state) => state.home.newsComics);
  const lastComics = useSelector((state) => state.home.lastComics);

  const info = useSelector((state) => state[type].results);
  useEffect(() => {
    if (!header.length) {
      dispatch(getRandomData({ type }));
      dispatch(getData({ type }));
    }
  }, [dispatch, header, type]);

  useEffect(() => {
    if (!lastComics.length) {
      dispatch(getLastComics());
    }
    if (!newsComics.length) {
      dispatch(getNewsComics());
    }
  }, [dispatch, lastComics.length, newsComics.length]);

  return (
    <div>
      <Masthead type={type} data={header} />
      <Slider
        data={header}
        type={type}
        id={"comics"}
        title="Comics you may not know"
      />
      <Slider
        data={newsComics}
        type={type}
        id={"newComics"}
        title="upcoming comic release"
      />
      <Slider
        data={lastComics}
        type={type}
        id={"lastComics"}
        title="latest releases"
      />
      <Search info={info} type={type} cb={{ getData }} />
    </div>
  );
}

export default Comic;
