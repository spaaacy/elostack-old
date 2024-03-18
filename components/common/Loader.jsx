import React from "react";
import { HashLoader, MoonLoader, PacmanLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex flex-1 bg-[#0f0f1c]">
      <div className="m-auto">
        <HashLoader color={"#7C3AED"} />
      </div>
    </div>
  );
};

export default Loader;

      