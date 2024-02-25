import React from "react";
import { MoonLoader, PacmanLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex flex-1">
      <div className="m-auto">
        <MoonLoader color={"#318CE7"} />
      </div>
    </div>
  );
};

export default Loader;
