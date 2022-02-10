import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, getRandomData } from "./serieSlice";
import { getSeries } from "../home/homeSlice";
//component
import Search from "../../components/Search";
import Masthead from "../../components/Masthead";
import Slider from "../../components/Slider";

function Serie({ type }) {
  const dispatch = useDispatch();

  const header = useSelector((state) => state[type].headboard);
  const info = useSelector((state) => state[type].results);
  const series = useSelector((state) => state.home.series);

  useEffect(() => {
    if (!header.length) {
      dispatch(getRandomData({ type }));
      dispatch(getData({ type }));
    }
  }, [dispatch, header, type]);

  useEffect(() => {
    if (!series.length) {
      dispatch(getSeries());
    }
  }, [dispatch, series.length]);

  return (
    <div>
      <Masthead type={type} data={header} />
      <Slider
        data={header}
        type={type}
        id={"series"}
        title="series you may not know"
      />
      <Slider data={series} type={type} id={"newSeries"} title="series 2022" />
      <Search info={info} type={type} cb={{ getData }} />
    </div>
  );
}

export default Serie;
