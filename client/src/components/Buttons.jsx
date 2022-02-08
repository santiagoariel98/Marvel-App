import React from "react";

function Buttons({ data }) {
  return (
    <>
      {/* characters */}
      {data.totalCharacters > 0 ? (
        <a href="#characters" className="bg-red-500 px-4 py-2">
          Characters
        </a>
      ) : (
        <></>
      )}

      {/* Comics */}
      {data.totalComics > 0 ? (
        <a href="#comics" className="bg-red-500 px-4 py-2">
          Comics
        </a>
      ) : (
        <></>
      )}

      {/* Creators */}
      {data.totalCreators > 0 ? (
        <a href="#creators" className="bg-red-500 px-4 py-2">
          Comics
        </a>
      ) : (
        <></>
      )}

      {/* Events */}
      {data.totalEvents > 0 ? (
        <a href="#events" className="bg-red-500 px-4 py-2">
          Events
        </a>
      ) : (
        <></>
      )}

      {/* Series */}
      {data.totalSeries > 0 ? (
        <a href="#series" className="bg-red-500 px-4 py-2">
          Series
        </a>
      ) : (
        <></>
      )}
    </>
  );
}

export default Buttons;
