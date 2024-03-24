import React from "react";
import { HashLoader, MoonLoader, PacmanLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex flex-1 ">
      <div className="m-auto">
        <HashLoader color={"#6f2da8"} />
      </div>
    </div>
  );
};

export default Loader;
