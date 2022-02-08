import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

//components
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

//pages
import Home from "./features/home/Home";
import LandingPage from "./features/landingPage/LandingPage";
import CharacterDetail from "./features/character/CharacterDetail";
import SerieDetail from "./features/serie/SerieDetail";

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
        <Route path="/series/:id" element={<SerieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
