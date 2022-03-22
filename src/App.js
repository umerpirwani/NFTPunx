/* eslint-disable */
import "nes.css/css/nes.min.css";
import "./assets/css/fonts/fonts.css";
import "./assets/css/style.css";
import "./assets/css/attributes.css";
import React from "react";
import Page from "./layout/";
import { useWallet } from "use-wallet";
import Minter from "./layout/panels/Minter";
import {Route} from "react-router-dom";
function App() {
  const wallet = useWallet();
  const blockNumber = wallet.getBlockNumber();
  return (
    
    <div className="app">
      <Page connected={wallet.status}/>
      <Route exact path='/minter' component={Minter} />
    </div>
         
      );
}

export default App;
