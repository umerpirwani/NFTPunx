import React from "react";

const GeneratePunkImage = ({ data, onGenerateClicked }) => {
    return (
      <button onClick={onGenerateClicked} className="nes-btn GeneratePunkImage purple-bg text-white text-uppercase">
       <strong>Generate Punk2 Image</strong>
      </button>
    //   <a href='/mint.js'><button onClick={onGenerateClicked} className="nes-btn GeneratePunkImage purple-bg text-white text-uppercase">
    //   <strong>Generate Punk Image</strong>
    //  </button></a>
    );
};

export default GeneratePunkImage; 
