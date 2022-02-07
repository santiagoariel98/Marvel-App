import React, { useEffect } from "react";
import {
  getCharacters,
  getEvents,
  getLastComics,
  getNewsComics,
} from "./homeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

//components
import Card from "../../components/Card";
//carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

function Home() {
  const dispatch = useDispatch();

  const characters = useSelector((state) => state.home.characters);
  const events = useSelector((state) => state.home.events);
  const newsComics = useSelector((state) => state.home.newsComics);
  const lastComics = useSelector((state) => state.home.lastComics);
  new Date().toDateString();
  useEffect(() => {
    dispatch(getCharacters());
    dispatch(getEvents());
    dispatch(getLastComics());
    dispatch(getNewsComics());
  }, [dispatch]);

  return (
    <div className="pt-16">
      <Carousel
        ssr
        partialVisibile
        itemClass="image-item"
        responsive={responsive}
      >
        {characters.length ? (
          characters.map((character) => (
            <Card key={character.id} data={character} type={"characters"} />
          ))
        ) : (
          <></>
        )}
      </Carousel>
      <h1> Events</h1>
      <Carousel
        ssr
        partialVisibile
        itemClass="image-item"
        responsive={responsive}
      >
        {events.length ? (
          events.map((event) => (
            <Card key={event.id} data={event} type={"events"} />
          ))
        ) : (
          <></>
        )}
      </Carousel>
      <h1>News Comics</h1>
      <Carousel
        ssr
        partialVisibile
        itemClass="image-item"
        responsive={responsive}
      >
        {newsComics.length ? (
          newsComics.map((comic) => (
            <Card key={comic.id} data={comic} type={"comics"} />
          ))
        ) : (
          <></>
        )}
      </Carousel>
      <h1>Last Comics</h1>
      <Carousel
        ssr
        partialVisibile
        itemClass="image-item"
        responsive={responsive}
      >
        {lastComics.length ? (
          lastComics.map((comic) => (
            <Card key={comic.id} data={comic} type={"comics"} />
          ))
        ) : (
          <></>
        )}
      </Carousel>
    </div>
  );
}

export default Home;
