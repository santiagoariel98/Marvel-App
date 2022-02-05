import { Pagination } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatatypeInfo } from "../features/character/characterSlice";
import CardList from "./CardList";

function Detail({ info, type, id, datatype }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const status = useSelector((state) => state.characters.status[datatype]);

  const handleChange = (e, value) => {
    setPage(value);
    if (value !== page) {
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

  return (
    <section className="bg-white py-2">
      <h1
        className="text-center text-black text-[2em] font-bold pt-16"
        id={`#${datatype}`}
      >
        {datatype.charAt(0).toUpperCase() + datatype.slice(1)}
      </h1>
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
