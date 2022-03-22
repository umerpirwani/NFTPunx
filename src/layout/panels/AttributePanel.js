import {  AttributePoints,   AttributeMenu,} from "../../components/character-creator/Attributes";
import React from "react";

const AttributePanel = ({
  activeCategory,
  onCategoryChange,
  onAttributeSelect,
  selections,
  twitterData,
  metamask,
  points
}) => {
  // console.log("selections on attributePanel", selections);
  return (
    <div className="attribute-panel panel col-4">
      <div className="inner">
        <AttributePoints points={points} />
        {/* {twitterData&&metamask&&
        <AttributeMenu
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
          onAttributeSelect={onAttributeSelect}
          points={points}
          selections={selections}
        />} */}
        {/* {!twitterData&&<h3>Please Verify Twitter!</h3>}
        {!metamask&&<h3>Please Connect Metamask!</h3>} */} 
        <AttributeMenu
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
          onAttributeSelect={onAttributeSelect}
          points={points}
          selections={selections}
        />
      </div>
    </div>
  );
};

export default AttributePanel;
