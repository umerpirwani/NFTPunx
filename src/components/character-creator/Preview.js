/* eslint-disable */
import PreviewImage from "../../assets/images/ui/character-creator/preview-placeholder.png";
import React from "react";

const Preview = ({ selections }) => {
  console.log('selections is ');
  console.log(selections);
    return (
      <div id="character-preview" >
        {selections && Object.keys(selections).length ? (
          <>
            <div id="ANTENNA" className={selections.ANTENNA}></div>
            <div id="BEARDS" className={selections.BEARD}></div>
            <div id="BINDI" className={selections.BINDI}></div>
            <div id="CHOKERS" className={selections.CHOKERS}></div>
            <div id="DEVO" className={selections.DEVO}></div>
            <div id="EYES" className={selections.EYES}></div>
            <div id="HAIR" className={selections.HAIR}></div>
            <div id="HEADPHONES" className={selections.HEADPHONES}></div>
            <div id="HEADS" className={selections.HEADS}></div>
            <div id="HOODIES" className={selections.HOODIES}></div>
            <div id="MASKBOTTOM" className={selections.MASKBOTTOM}></div>
            <div id="MASKS" className={selections.MASKS}></div>
            <div id="MOUTHS" className={selections.MOUTHS}></div>
            <div id="NOSES" className={selections.NOSES}></div>
            <div id="ROBOTHEAD" className={selections.ROBOTHEAD}></div>
            <div id="ROBOTNECK" className={selections.ROBOTNECK}></div>
            <div id="VAPES" className={selections.VAPES}></div>
            <div id="BACKGROUNDS" className={selections.BACKGROUNDS}></div>
          </>
        ) : (
          <></>
        )}
      </div>
    );
};

export default Preview;
