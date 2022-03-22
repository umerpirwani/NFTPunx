import React from "react";
import { useEffect, useState } from "react";
import pinImageToPinata from "../../components/metamask/pinImageToPinata.js";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "../../components/metamask/interact.js";

const Minter = (props) => {
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [signature, setSignature] = useState("");
    const [attributes, setAttributes] = useState("");
    const [url, setURL] = useState("");
    useEffect(async () => {
      const { address, status } = await getCurrentWalletConnected();
  
      setWallet(address);
      setStatus(status);
  
      addWalletListener();
    }, []);
    
    function addWalletListener() {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length > 0) {
            setWallet(accounts[0]);
            setStatus("👆🏽 Write a message in the text-field above.");
          } else {
            setWallet("");
            setStatus("🦊 Connect to Metamask using the top right button.");
          }
        });
      } else {
        setStatus(
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        );
      }
    }
  
    const connectWalletPressed = async () => {
      const walletResponse = await connectWallet();
      setStatus(walletResponse.status);
      setWallet(walletResponse.address);
    };
  
    const onMintPressed = async () => {
      const { success, status } = await mintNFT(url,attributes,signature);
      setStatus(status);
      if (success) {
        setSignature("");
        setAttributes("");
        // setName("");
        // setDescription("");
        setURL("");
      }
    };
    return (
      <div className="Minter">
        
        <button id="walletButton" onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>
  
        <br></br>
        <h1 id="title"> NFT Minter</h1>
        <p>
          Simply add your asset's link, name, and description, then press "Mint."
        </p>
        <form>
          <h2>🖼 Upload image </h2>
          {/* <input type="file" id="image_input"
          onChange={(event) => setImage(event.target.value)}/>
          <div id="display_image"></div> */}
          <input type="file" id="image_input"
          onChange={(event) => setURL(event.target.value)}/> //pinImageToPinata.js sy yahan hash chahiye
          <div id="display_image"></div>
          {/* <input
            type="file"
            placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>" 
            onChange={(event) => setURL(event.target.value)}
          /> */}
          <h2>✍️ Attributes: </h2>
          <input
            type="text"
            placeholder="e.g. Eyes,Nose,Mouth ;)"
            onChange={(event) => setAttributes(event.target.value)}//yahan py humain sary user selected attributes chahiye
          />
          <h2>✍️ Signature: </h2>
          <input
            type="text"
            placeholder="e.g. signature from Private Key;)"
            onChange={(event) => setSignature(event.target.value)}
          />
        </form>
        <button id="mintButton" onClick={onMintPressed}>
          Mint NFT
        </button>
        <p id="status" style={{ color: "red" }}>
          {status}
        </p>
      </div>
    );
    
  };
  
  export default Minter;