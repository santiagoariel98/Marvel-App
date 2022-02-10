import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, getRandomData } from "./eventSlice";
import { getEvents } from "../home/homeSlice";
//component
import Search from "../../components/Search";
import Masthead from "../../components/Masthead";
import Slider from "../../components/Slider";

function Event({ type }) {
  const dispatch = useDispatch();

  const header = useSelector((state) => state[type].headboard);
  const info = useSelector((state) => state[type].results);
  const events = useSelector((state) => state.home.events);

  useEffect(() => {
    if (!header.length) {
      dispatch(getRandomData({ type }));
      dispatch(getData({ type }));
    }
  }, [dispatch, header, type]);
  useEffect(() => {
    if (!events.length) {
      dispatch(getEvents());
    }
  }, [dispatch, events.length]);
  return (
    <div>
      <Masthead type={type} data={header} />
      <Slider
        data={header}
        type={type}
        id={"newEvents"}
        title="Events you may not know"
      />
      <Slider data={events} type={type} id={"new Events"} title="news Events" />
      <Search info={info} type={type} cb={{ getData }} />
    </div>
  );
}

export default Event;
