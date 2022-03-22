import Logo from "../../components/common/Logo";
import ActionButtons from "./ActionButtons"
import CharacterBanner from "./CharacterBanner";
import PageTitle from "./PageTitle";
import React from "react";

const Header = (props) => {

  
    return (
      <div className="header">
        <div className="inner bg-diffuse-purple">
        <div className="top-content row pb-3">
          <div className="col d-none d-md-flex col-md-3"></div>
          <div className="col col-12 col-md-6">
            <div className="inner pt-4 text-center">
            <Logo />
            <PageTitle title="Build Your Character" />

            </div>
          </div>
          <div className="col col-12 col-md-3">
            <ActionButtons setTwitterData={props.setTwitterData} setMetamask={props.setMetamask}/>
          </div>
        </div>
        <CharacterBanner />
      </div></div>
    );
};

export default Header;