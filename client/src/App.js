import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

//components
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
// import Footer from "./components/Footer";
//pages
import Home from "./features/home/Home";
import LandingPage from "./features/landingPage/LandingPage";
import CharacterDetail from "./features/character/CharacterDetail";
import ComicDetail from "./features/comic/ComicDetail";
import CreatorDetail from "./features/creator/CreatorDetail";
import EventDetail from "./features/event/EventDetail";
import SerieDetail from "./features/serie/SerieDetail";
//pages
import Character from "./features/character/Character";
import Comic from "./features/comic/Comic";
import Creator from "./features/creator/Creator";
import Event from "./features/event/Event";
import Serie from "./features/serie/Serie";

function App() {
  const status = useSelector((state) => state.home.status);

  return (
    <BrowserRouter>
      {status === "loading" ? <Loading /> : <></>}
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
        <Route path="/comics/:id" element={<ComicDetail />} />
        <Route path="/creators/:id" element={<CreatorDetail />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/series/:id" element={<SerieDetail />} />
        {/* Pages */}
        <Route path="/characters" element={<Character type={"characters"} />} />
        <Route path="/comics" element={<Comic type={"comics"} />} />
        <Route path="/creators" element={<Creator type={"creators"} />} />
        <Route path="/events" element={<Event type={"events"} />} />
        <Route path="/series" element={<Serie type={"series"} />} />
        {/* <Route path="/*" element={<Footer />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
