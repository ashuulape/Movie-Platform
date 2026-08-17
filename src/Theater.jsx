import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Screen } from "./Watch";

const Theater = () => {
  const { id } = useParams();

  const { state } = useLocation();
  console.log(state, id);

  return (
    <section>
      <Screen stateid={state?.id} id={id} />
    </section>
  );
};

export default Theater;
