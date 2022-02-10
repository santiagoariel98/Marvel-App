import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SearchIcon from "@mui/icons-material/Search";
import { Pagination } from "@mui/material";
import Sort from "./Sort";
import CardList from "./CardList";

function Search({ info, type, id, datatype, cb }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [sort, setSort] = useState("");

  const status = useSelector((state) =>
    id && datatype ? state[type].status[datatype] : state[type].status.general
  );

  const handleSearch = (e, value) => {
    let q = { sort };
    e.preventDefault();
    if (["comics", "series"].includes(datatype || type)) {
      q = { titleStartsWith: input };
    } else if (
      ["events", "creators", "characters"].includes(datatype || type)
    ) {
      q = { nameStartsWith: input };
    }

    if (value && value !== page) {
      setPage(value);
      q = { ...q, page: value };
    } else {
      setPage(1);
      q = { ...q, page: 1 };
    }
    if (e.target.name === "orderBy") {
      let orderBy = e.target.value;
      q = { ...q, orderBy };
      setSort(e.target.value);
    }
    let send = datatype && id ? `${type}/${id}/${datatype}` : type;
    if (datatype && id) {
      dispatch(cb.getSubdata({ type, id, datatype, q }));
    } else {
      dispatch(cb.getData({ type: send, q }));
    }
  };

  return (
    <section className="bg-white py-2 " id={datatype || type}>
      <div className="flex justify-between px-4 items-center pb-4">
        <h1
          className="text-black text-[2.5em] font-bold uppercase"
          id={`#${datatype || type}`}
        >
          {datatype && id ? datatype : type}
        </h1>
        <form
          onSubmit={handleSearch}
          className="text-slate-600 flex flex-col items-end md:flex-row"
        >
          <label className="bg-gray-200 px-2 py-1 rounded-full w-max">
            <SearchIcon />
            <input
              name={"name"}
              onChange={(e) => setInput(e.target.value)}
              min={1}
              max={25}
              className="bg-transparent w-24"
              placeholder={`Search ${datatype || type}`}
            />
          </label>
          <Sort type={datatype || type} cb={handleSearch} />
        </form>
      </div>
      {info.data?.length ? (
        <div className="md:auto-rows-[21rem] grid gap-4 grid-flow-dense auto-rows-[12rem] grid-cols-menu md:grid-cols-menu2 w-full place-items-center">
          {info.data.map((data, i) => (
            <CardList
              key={data.id || i}
              data={data}
              type={datatype || type}
              status={status}
            />
          ))}
        </div>
      ) : (
        <div className="text-center uppercase">
          {datatype || type} not Found
        </div>
      )}
      <Pagination
        count={info.pages}
        page={page}
        onChange={handleSearch}
        className="bg-white flex justify-center mt-4"
        disabled={status === "loading" ? true : false}
      />
    </section>
  );
}

export default Search;
