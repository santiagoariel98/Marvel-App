import React from "react";
import Search from "./Search";

function Details({ data, type, cb }) {
  return (
    <>
      {/* characters */}
      {data.totalCharacters > 0 ? (
        <Search
          info={data.characters}
          type={type}
          datatype={"characters"}
          id={data.id}
          cb={cb}
        />
      ) : (
        <></>
      )}
      {/* comics */}
      {data.totalComics > 0 ? (
        <Search
          info={data.comics}
          type={type}
          datatype={"comics"}
          id={data.id}
          cb={cb}
        />
      ) : (
        <></>
      )}
      {/* creators */}
      {data.totalCreators > 0 ? (
        <Search
          info={data.creators}
          type={type}
          datatype={"creators"}
          id={data.id}
          cb={cb}
        />
      ) : (
        <></>
      )}
      {/* events */}
      {data.totalEvents > 0 ? (
        <Search
          info={data.events}
          type={type}
          datatype={"events"}
          id={data.id}
          cb={cb}
        />
      ) : (
        <></>
      )}
      {/* series */}
      {data.totalSeries > 0 ? (
        <Search
          info={data.series}
          type={type}
          datatype={"series"}
          id={data.id}
          cb={cb}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Details;
