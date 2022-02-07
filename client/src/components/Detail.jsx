import { Pagination } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatatypeInfo } from "../features/character/characterSlice";
import CardList from "./CardList";

//@mui
import SearchIcon from "@mui/icons-material/Search";
import OrderBy from "./OrderBy";

function Detail({ info, type, id, datatype }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [sort, setSort] = useState("");

  const status = useSelector((state) => state.characters.status[datatype]);

  const handleChange = (e, value, q = {}) => {
    setPage(value);
    if (input.length || sort.length) {
      handleSearch(e, value);
    } else if (value !== page) {
      dispatch(
        getDatatypeInfo({
          type,
          id,
          datatype,
          pages: value,
        })
      );
    }
  };
  const handleSearch = (e, value) => {
    e.preventDefault();
    setPage(value > 1 ? value : 1);
    let q;

    if (["comics", "series"].includes(datatype)) {
      q = { titleStartsWith: input };
    } else if (["events", "creators", "characters"].includes(datatype)) {
      q = { nameStartsWith: input };
    }
    if (e.target.name === "orderBy") {
      setSort(e.target.value);
      q = e.target.value ? { ...q, orderBy: e.target.value } : { ...q };
    } else if (sort) {
      q = { ...q, orderBy: sort };
    }

    dispatch(
      getDatatypeInfo({
        type,
        id,
        datatype,
        pages: value > 1 ? value : 1,
        q,
      })
    );
  };

  return (
    <section className="bg-white py-2 ">
      <div className="flex justify-between px-4 items-center">
        <h1 className="text-black text-[2.5em] font-bold" id={`#${datatype}`}>
          {datatype.charAt(0).toUpperCase() + datatype.slice(1)}
        </h1>
        <form
          onSubmit={handleSearch}
          className="text-slate-600 flex flex-col items-end lg:flex-row"
        >
          <label className="bg-gray-200 px-2 py-1 rounded-full w-max">
            <SearchIcon />
            <input
              name={"name"}
              onChange={(e) => setInput(e.target.value)}
              min={1}
              max={25}
              className="bg-transparent w-24"
              placeholder={`Search ${datatype}`}
            />
          </label>
          <OrderBy type={datatype} cb={handleSearch} />
        </form>
      </div>
      <div className="md:auto-rows-[21rem] grid gap-4 grid-flow-dense auto-rows-[12rem] grid-cols-menu md:grid-cols-menu2 w-full place-items-center">
        {info.data.map((data) => (
          <CardList key={data.id} data={data} type={datatype} status={status} />
        ))}
      </div>
      <Pagination
        count={info.pages}
        name="comics"
        page={page}
        onChange={handleChange}
        className="bg-white flex justify-center mt-4"
        href="#comics"
        disabled={status === "loading" ? true : false}
      />
    </section>
  );
}

export default Detail;
