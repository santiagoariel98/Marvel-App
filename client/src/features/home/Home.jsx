import React, { useEffect } from "react";
import {
  getCharacters,
  getEvents,
  getLastComics,
  getNewsComics,
  getSeries,
} from "./homeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

//components
import Slider from "../../components/Slider";
//carousel

function Home() {
  const dispatch = useDispatch();

  const allInfo = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(getCharacters());
    dispatch(getEvents());
    dispatch(getLastComics());
    dispatch(getNewsComics());
    dispatch(getSeries());
  }, [dispatch]);

  return (
    <div className="pt-16">
      <Slider
        data={allInfo.characters}
        title="Characters"
        id="characters-home"
        type="characters"
      />
      <Slider
        data={allInfo.events}
        title="events"
        id="events-home"
        type="events"
      />
      <Slider
        data={allInfo.series}
        title="series"
        id="series-home"
        type="series"
      />
      <Slider
        data={allInfo.newsComics}
        title="news Comics"
        id="newsComics-home"
        type="comics"
      />
      <Slider
        data={allInfo.lastComics}
        title="last Comics"
        id="lastComics-home"
        type="comics"
      />
    </div>
  );
}

export default Home;
