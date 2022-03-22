/* eslint-disable */
import React, {useRef, useState} from "react";
import Preview from "../../components/character-creator/Preview";
import GeneratePunkImageButton from "../../components/character-creator/GeneratePunkImageButton";
import Copy from "../../assets/data/constants/Copy";
import domtoimage from "dom-to-image-more";
import {  exportComponentAsPNG } from 'react-component-export-image';
import { app, db } from '../../utilities/firebase';
import { onSnapshot, collection, setDoc, doc, getDocs } from "firebase/firestore";
import { Modal, Button } from "react-bootstrap";
import VerifyTwitterButton from "../../components/twitter/VerifyTwitterButton";
import ConnectMetamaskButton from "../../components/metamask/ConnectMetamaskButton";
import { AttributePoints } from "../../components/character-creator/Attributes";
import AttributeOptions from "../../assets/data/constants/attributes.json";
import Minter from "./Minter";

const ActionPanel = ({
  selections,
  twitterData,
  metamask,
  setTwitterData,
  setMetamask,
  generateRandomImage,
  points,
  activeCategory,
  onCategoryChange,
  onAttributeSelect,
}) => {
  const forceUpdate: () => void = useState()[1].bind(null, {}); // see NOTE below

  const token = twitterData?.token;
  const inputRef = useRef(null);
  const [show, setShow] = useState(false);
  const [showMustSelectAttribute, setShowMustSelectAttribute] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShowMustSelectAttribute(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const [optionBool, setOptionBool] = useState(true);
  const onSave = () => {
    const date = new Date();
    const data = {
      twitter_token: token,
      metamask_account: metamask,
      attributes: selections,
    };
    exportComponentAsPNG(inputRef);
    const docRef = doc(db, "punx", `${metamask}-${date.getTime()}`);
    const payload = { data };
    setDoc(docRef, payload);
  };

  const onGenerateClicked = () => {
    if (!twitterData || !metamask) {
      handleShow();
      return;
    }

    if (
      selections.EYES == "" ||
      selections.NOSES == "" ||
      selections.MOUTHS == ""
    ) {
      setShowMustSelectAttribute(true);
      return;
    }

    getDocs(collection(db, "punx")).then((docs) => {
      if (compareWithData(docs) == 1) {
        onSave();
      } else {
        alert("This image was created before, please change some attributes");
      }
    });
  };

  const compareWithData = (objects) => {
    let n1 = 1;
    objects.forEach((doc) => {
      if (compareObjects(doc.data().data.attributes, selections) == 0) {
        n1 = 0;
        return;
      }
    });
    return n1;
  };

  const compareObjects = (a, b) => {
    let n2 = 0;
    for (const key in a) {
      if (a[key] != b[key]) {
        n2 = 1;
        return;
      }
    }
    return n2;
  }
  const onClickAttributes = (e) => {
    console.log(e.target.value);
    console.log(AttributeOptions[activeCategory]);
    onCategoryChange(e.target.value.toUpperCase());
  };
  const onClickAttributeOption = (e) => {
//console.log(e.target.value, selections[activeCategory]);
                      onAttributeSelect(
                        activeCategory,
                        selections[activeCategory] == e.target.value
                          ? ""
                          : e.target.value
                      );


   // forceUpdate();
  };
  const deselectAttribute = (e) => {
  console.log("deselect" + e.target.value, selections[activeCategory]);

}
  return (
    <div className="action-panel panel col-8 no-padding-mobile">
      <div className="inner">
        <div className="row">
          <div className="preview no-padding-mobile col-xl text-center">
            <div className="innera">
              <h2 className="text-uppercase p-4 m-3">Design your Punk</h2>
              <AttributePoints points={points} />
              <div className="drop-down-attributes p-5 d-block d-xl-none text-center">
                <div className="mobile-dropdown">
                  <div className="nes-select is-dark">
                    <select
                      required=""
                      id="attribute-category"
                      onChange={onClickAttributes}
                      defaultValue={activeCategory}
                    >
                      {Object.keys(AttributeOptions).map((key, i) => {
                        return !AttributeOptions[key].disabled ? (
                          <option
                            key={
                              i +
                              AttributeOptions[key].name.replace(/[\W_]+/g, " ")
                            }
                            className="category"
                            value={key}
                          >
                            {AttributeOptions[key].name}
                          </option>
                        ) : (
                          false
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="mobile-dropdown sub">
                  <div className="nes-select is-dark">
                    <select
                      required=""
                      id="attribute-options"
                      onChange={onClickAttributeOption}
                      //defaultValue={selections[activeCategory]}
                    >
                      {AttributeOptions[activeCategory].options.map(
                        (opt, i) => {
                          return (
                            <option
                              key={i + opt.name.replace(/[\W_]+/g, " ")}
                              className="category-option"
                              value={opt.name}
                              onClick={(e)=>{console.log(e)}}
                            >
                              {opt.name}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                </div>

                {points < 1 && (
                  <div className="attribute-points red text-uppercase p-4 d-flex align-items-center">
                    <span className="d-inline-block">
                      Please deselect some elements if you want more attribute
                    </span>
                  </div>
                )}
              </div>
              <div id="character-preview" ref={inputRef}>
                {selections && Object.keys(selections).length ? (
                  <>
                    <div id="ANTENNA" className={selections.ANTENNA}></div>
                    <div id="BEARDS" className={selections.BEARD}></div>
                    <div id="BINDI" className={selections.BINDI}></div>
                    <div id="CHOKERS" className={selections.CHOKERS}></div>
                    <div id="DEVO" className={selections.DEVO}></div>
                    <div id="EYES" className={selections.EYES}></div>
                    <div id="HAIR" className={selections.HAIR}></div>
                    <div
                      id="HEADPHONES"
                      className={selections.HEADPHONES}
                    ></div>
                    <div id="HEADS" className={selections.HEADS}></div>
                    <div id="HOODIES" className={selections.HOODIES}></div>
                    <div
                      id="MASKBOTTOM"
                      className={selections.MASKBOTTOM}
                    ></div>
                    <div id="MASKS" className={selections.MASKS}></div>
                    <div id="MOUTHS" className={selections.MOUTHS}></div>
                    <div id="NOSES" className={selections.NOSES}></div>
                    <div id="ROBOTHEAD" className={selections.ROBOTHEAD}></div>
                    <div id="ROBOTNECK" className={selections.ROBOTNECK}></div>
                    <div id="VAPES" className={selections.VAPES}></div>
                    <div id="BACKGROUNDS" className={"background"}></div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {/** MOBILE BUTTON **/}
            <div className="mobile-btn">
              <button
                onClick={onGenerateClicked}
                className="nes-btn is-primary text-white purple-bg w-100 mt-5 d-xl-none GeneratePunkImage text-uppercase"
              >
                <strong>Generate Punk2 Image</strong>
              </button>
              <button
                onClick={generateRandomImage}
                className="nes-btn is-normal w-50 mt-4 mb-5 GeneratePunkImage text-uppercase d-none"
              >
                <strong>Random</strong>
              </button>
            </div>
          </div>
          <div className="col ps-xl-5 pt-xl-0">
            <div className="spacer d-none d-xl-block"></div>
            <div className="action-panel-text py-1">{Copy.ActionPanelText}</div>

            {/** DESKTOP BUTTON **/}
            <button
              onClick={onGenerateClicked}
              className="nes-btn is-normal d-none d-xl-block GeneratePunkImage purple-bg text-uppercase"
            >
              <strong>Generate Punk1 Image</strong>
            </button>
            {showMustSelectAttribute && (
              <Modal show={showMustSelectAttribute} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Please make sure you selected eyes, nose and mouth!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
        </div>
      </div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!twitterData && <h3>Verify Twitter!</h3>}
            {!metamask && <h3>Connect Metamask!</h3>}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VerifyTwitterButton setTwitterData={setTwitterData} />
          <ConnectMetamaskButton setMetamask={setMetamask} />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};;

export default ActionPanel;
