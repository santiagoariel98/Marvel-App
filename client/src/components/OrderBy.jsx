import React from "react";

function OrderBy({ type, cb }) {
  return (
    <select
      onChange={(e) => cb(e)}
      name="orderBy"
      className="mt-2 bg-gray-200 text-slate-600 rounded-sm w-max lg:px-2 lg:py-1 lg:rounded-full lg:mt-0 lg:ml-4"
    >
      <option value="">Order</option>
      {["characters", "events"].includes(type) ? (
        <>
          <option value={"name"}>A-Z</option>
          <option value={"-name"}>Z-A</option>
        </>
      ) : ["comics", "series"].includes(type) ? (
        <>
          <option value={"title"}>A-Z</option>
          <option value={"-title"}>Z-A</option>
        </>
      ) : type === "creators" ? (
        <>
          <option value={"firstName"}>A-Z(firstName)</option>
          <option value={"-firstName"}>Z-A(firstName)</option>
          <option value={"lastName"}>A-Z(lastName)</option>
          <option value={"-lastName"}>Z-A(lastName)</option>
        </>
      ) : (
        <></>
      )}
      <option value={"modified"}>time</option>
      <option value={"-modified"}>-time</option>
    </select>
  );
}

export default OrderBy;
