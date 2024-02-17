import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

export const PageLoader = () => {
  return (
    <div className="page-loader-container">
      <PacmanLoader color="#845BB3" size={40} />
    </div>
  );
};
