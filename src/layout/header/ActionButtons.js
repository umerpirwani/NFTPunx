import React from "react";
import VerifyTwitterButton from "../../components/twitter/VerifyTwitterButton";
import ConnectMetamaskButton from "../../components/metamask/ConnectMetamaskButton";

 
const ActionButtons = (props) => {

  
  return (
      <div className="action-buttons text-center p-4 text-right m-0 m-auto">
          <VerifyTwitterButton setTwitterData={props.setTwitterData}/>
          <ConnectMetamaskButton setMetamask={props.setMetamask}/>
    </div>
  );
};

export default ActionButtons;
