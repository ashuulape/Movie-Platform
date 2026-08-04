import React from "react";
import { Card } from "./Card";

const Movies = ({ data }) => {
  return (
    <div>
      <h1 className="text-white text-2xl w-full text-center">Deatils</h1>
      <div className="w-full h-fit flex  flex-wrap gap-10">
        {data.map((e, key) => {
          return <Card key={key} data={e} />;
        })}
      </div>
    </div>
  );
};

export default Movies;
