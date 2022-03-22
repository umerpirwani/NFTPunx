/* eslint-disable */
import { useState, useEffect } from "react";
import Header from "./header/Header";
import AttributePanel from "./panels/AttributePanel";
import ActionPanel from "./panels/ActionPanel";
import { defaultAttributes } from "../assets/data/constants/options";
import AttributeOptions from "../assets/data/constants/attributes.json";
import React from "react";

const Page = () => {

  const [token, setToken] = useState(null);
  const [metamask, setmetamask] = useState(null);
  const [activeCategory, setActiveCategory] = useState("ANTENNA");
  const [selections, setSelections] = useState(defaultAttributes);
  const [points, setPoints] = useState(5);
  // const [activeAttribute, setActiveAttribute] = useState();
  const setMetamask = (account) =>{
    setmetamask(account);
  }
  
  const setTwitterData = (token) =>{
    setToken(token);
  }
 
  const generateRandomAttribute = (Attributes,Limits) =>
  { 
    let i=0;
    let prop;
    while (i==0) {
      const values = Object.values(Attributes)
      prop = values[Math.floor(Math.random() * values.length)].name;
      if(!Limits.includes(prop)){
        i=1;
      }
    }    
    return prop;    
  }
  const generateRandomImage = () =>{
    const att_1 = generateRandomAttribute(AttributeOptions, ['BACKGROUNDS', "HEADS", "EYES","NOSES","MOUTHS"]);
    const att_2 = generateRandomAttribute(AttributeOptions, ['BACKGROUNDS', "HEADS", "EYES","NOSES","MOUTHS",att_1]);
    const ranAtt = ["HEADS", "EYES","NOSES","MOUTHS", att_1, att_2];
    let ns = {...defaultAttributes};
    for (const key in AttributeOptions) {
      if(ranAtt.includes(key)){
        const ranNum = Math.floor(Math.random()*AttributeOptions[key].options.length);      
        ns[key]= AttributeOptions[key].options[ranNum].name;
      }
    }
    setSelections(ns);
    setPoints(0);
  }

  const onAttributeSelect = (category, attribute) => {
    let ns = selections;
    if(category=="HEADS"){
      ns[category]=attribute;
      setSelections({...selections, ns});
      let element = document.getElementById(category);
      element.className = attribute;
    }
    else{
      if(points>0){
        
        if(category!="BACKGROUNDS"){    
          if (ns[category]!=attribute){
              if(ns[category]==""){        
                setPoints(points-1);
              } 
              ns[category] = attribute;
          }
          else{
            ns[category]="";
            setPoints(points+1);
          }
          setSelections({...selections, ns});
          let element = document.getElementById(category);
          element.className = attribute;
        }
      }
      else {
        if(ns[category]==attribute&&category!="BACKGROUNDS"){
          ns[category]="";
          setPoints(points+1);
          setSelections(ns);  
        }
        
      }
    }
  }
  
    return (
      <div id="main">
        <Header setTwitterData={setTwitterData} setMetamask={setMetamask}/>
        <div className="row max-width">
          <AttributePanel 
            activeCategory={activeCategory}
            onCategoryChange={(category) => setActiveCategory(category)}
            // onAttributeSelect={(c, a) => onAttributeSelect(c,a)}
            onAttributeSelect={onAttributeSelect}
            selections={selections}
            twitterData={token}
            metamask={metamask}
            points = {points}
          />
          <ActionPanel selections={selections} twitterData={token} activeCategory={activeCategory}
            metamask={metamask} setTwitterData={setTwitterData} setMetamask={setMetamask} 
            generateRandomImage ={generateRandomImage} points = {points}
            onCategoryChange={(category) => setActiveCategory(category)}
            onAttributeSelect={onAttributeSelect} />
        </div>
      </div>
    );
    
};

export default Page;