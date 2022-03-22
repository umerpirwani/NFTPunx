import React from "react";

const Locked = ({ show }) => {
  return (
    <div
      onClick={onGenerateClicked}
      className="locked"
    >
      <strong>Generate Punk Image</strong>
    </div>
  );
};

export default Locked;
