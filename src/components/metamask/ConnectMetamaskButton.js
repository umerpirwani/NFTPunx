import  React,{ useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  // mintNFT,
} from "./interact.js";

const ConnectMetamaskButton = () => {
    //setMetamask functionality from ConnectMetamaskButton(orignal)
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    //yahn pr genrated nft ki fields bhi add hogai 
    // const [signature, setSignature] = useState("");
    // const [attributes, setAttributes] = useState("");
    // const [url, setURL] = useState("");
  
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
  
    // const onMintPressed = async () => {
    //   const { success, status } = await mintNFT(url,attributes ,signature);
    //   setStatus(status);
    //   if (success) {
    //     setURL("");
    //     setAttributes("");
    //     setSignature("");
    //   }
    // };
  
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
        {/* <h1 id="title"> NFT Minter</h1>
        <p>
          Simply add your asset's link, name, and description, then press "Mint."
        </p>
        <form>
          <h2>🖼 Link to asset: </h2>
          <input
            type="text"
            placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>" //pinImageToPinata.js sy yahan chahiye
            onChange={(event) => setURL(event.target.value)}
          />
          <h2>✍️ Attributes: </h2>
          <input
            type="text"
            placeholder="e.g. Eyes,Nose,Mouth ;)"
            onChange={(event) => setAttributes(event.target.value)}//yahan py humain sary selected attributes chahiye
          />
          <h2>✍️ Signature: </h2>
          <input
            type="text"
            placeholder="e.g. signature Hash ;)"
            onChange={(event) => setSignature(event.target.value)}
          />
        </form>
        <button id="mintButton" onClick={onMintPressed}>
          Mint NFT
        </button>
        <p id="status" style={{ color: "red" }}>
          {status}
        </p> */}
      </div>
    );
  };
  
// console.log("wallet info",wallet.account);
//   return (
//     <button 
//       onClick={() => toggleConnection()}
//       className={
//         "connect-metamask-button btn btn-lg text-uppercase d-block justify-content-center " +
//           (connectWallet().status !==
//         "connected"
//           ? "magenta-bg"
//           : "green-bg text-dark")
//       }
//     >
//       <span>{walletLabel}</span>
//     </button>
//   );
// };

export default ConnectMetamaskButton;
