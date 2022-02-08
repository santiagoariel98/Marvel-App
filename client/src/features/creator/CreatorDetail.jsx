import React, { useEffect } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { getDataById, getSubdata } from "./creatorSlice";
//react router dom
import { useParams } from "react-router-dom";
// components
import Loading from "../../components/Loading";
import Details from "../../components/Details";
import InfoData from "../../components/InfoData";

function CreatorDetail() {
  const type = "creators";

  const { id } = useParams();
  const dispatch = useDispatch();

  const info = useSelector((state) => state[type].current);
  const status = useSelector((state) => state[type].status.general);

  useEffect(() => {
    if (!info.data || +info.data.id !== +id)
      dispatch(getDataById({ type, id }));
  }, [id, dispatch, info.data]);

  return (
    <div className="bg-black">
      {status === "loading" ? <Loading /> : <></>}
      {info && info.data && info.success ? (
        <>
          <InfoData data={info.data} />
          <Details data={info.data} type={type} cb={getSubdata} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CreatorDetail;
