/* eslint-disable */
import React, { useState } from "react";
import AttributeOptions from "../../assets/data/constants/attributes.json";

const AttributePoints = ({ points }) => {
  
  return (
    
    <><div className="attribute-points green text-uppercase p-4 pe-0 d-flex align-items-center">
        <span className="attribute-token d-inline-block"></span>
        <span className="d-inline-block">{points ?? 0} Attribute Points</span>
      </div>
      {points<1&&<div className="attribute-points attribute red text-uppercase p-4 d-flex align-items-center">
        <span className="d-inline-block">Please deselect some elements if you want more attribute</span>
      </div>}
    </>
  );
};

const AttributeMenu = ({ activeCategory, onCategoryChange, onAttributeSelect, points, selections }) => {
  const [activeClassName, setActiveClassName] = useState( " active magenta");
  const AttributeCategories = () => {   
    return (
      <>
      <div className="attribute-menu">
          {Object.keys(AttributeOptions).map((opts, i) => {
       
       return  !opts.disabled && opts != "BACKGROUNDS" ? <div key={i+opts} className="menu-item">
            <button
              onClick={() => { onCategoryChange(opts) }}
              className={
                "category" + (activeCategory == opts ? " active magenta" : "")
              }
            >
              {opts}
            </button> 
          </div>: null
        })}
      </div>

      </>
    );
  };
  const AttributeCategoryOptions = ({ category, onSelect, selections }) => {
    return (
      <>
        {AttributeOptions[category]
          ? AttributeOptions[category].options.map((opts, i) => {
      
            return (
              <div key={i + opts.name} className="menu-item">
                <button
                  onClick={() => { onSelect(category, opts.name); }}
                  className={"category-option"+ (selections[category] == opts.name? activeClassName : "") }
                  value={opts.name}                  
                >
                  {opts.name}
                </button>
              </div>
            )
          })
          : ""}
      </>
    );
  };

  return (
    <div className="attribute-menu-container pt-3">
      <h3 className="pb-3">ATTRIBUTES</h3>
      <div className="row">
        <div className="col  col-xl-6">
          <AttributeCategories onChange={onCategoryChange} />
        </div>
        <div className="col-xl-6">
          <AttributeCategoryOptions
            // onChange={onAttributeSelect}
            selections={selections}
            onSelect={onAttributeSelect}
            category={activeCategory}
          />
        </div>
      </div>
    </div>
  );
};

export { AttributePoints, AttributeMenu };
