import React from "react";
// import { Counter } from "./features/counter/Counter";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import Loading from "./components/Loading";

import CharactersDetail from "./pages/CharactersDetail";

function App() {
  const status = useSelector((state) => state.home.status);

  return (
    <BrowserRouter>
      {status === "loading" ? <Loading /> : <></>}
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/characters/:id" element={<CharactersDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
