import React from "react";
import "./WorkInProgress.css";

const workInProgress = () => {
  return (
    <div className="wordInProgressSection">
      <marquee behavior="" direction="">
        <h3>
          This site is under construction , we are not taking any orders. Please
          visit us later.
        </h3>
      </marquee>
    </div>
  );
};

export default workInProgress;
