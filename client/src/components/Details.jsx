import React from "react";
import Detail from "./Detail";

function Details({ data, type, cb }) {
  return (
    <>
      {/* characters */}
      {data.totalCharacters > 0 ? (
        <Detail
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
        <Detail
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
        <Detail
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
        <Detail
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
        <Detail
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
