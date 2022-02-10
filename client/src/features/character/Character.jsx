import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, getRandomData } from "./characterSlice";
import { getCharacters } from "../home/homeSlice";
//component
import Search from "../../components/Search";
import Masthead from "../../components/Masthead";
import Slider from "../../components/Slider";

function Character({ type }) {
  const dispatch = useDispatch();

  const header = useSelector((state) => state[type].headboard);
  const info = useSelector((state) => state[type].results);

  const characters = useSelector((state) => state.home.characters);

  useEffect(() => {
    if (!header.length) {
      dispatch(getRandomData({ type }));
      dispatch(getData({ type }));
    }
  }, [dispatch, header, type]);

  useEffect(() => {
    if (!characters.length) {
      dispatch(getCharacters());
    }
  }, [dispatch, characters.length]);

  return (
    <div>
      <Masthead type={type} data={header} />
      <Slider
        title="FEATURED CHARACTERS"
        data={characters}
        type={type}
        id={"featured"}
      />
      <Slider
        data={header}
        type={type}
        id={"newCharacters"}
        title="Characters you may not know"
      />
      <Search info={info} type={type} cb={{ getData }} />
    </div>
  );
}

export default Character;
