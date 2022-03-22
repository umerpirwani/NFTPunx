/* eslint-disable */
import React,{useState, useEffect} from "react";
import { signInWithPopup, TwitterAuthProvider } from "@firebase/auth";
import { auth, twitterAuthProvider, functions } from "../../utilities/firebase";
import { getFollowing } from "../../utilities/twitter";

const needle = require("needle");
const VerifyTwitterButton = (props) => {
  const [twitterData, setTwitterData] = useState(null);
  const [secret, setSecret] = useState(null);
  useEffect(() => {
    props.setTwitterData(twitterData)
  }, [twitterData]);
const authHandler = (err, data) => {
  signInWithPopup(auth, twitterAuthProvider)
    .then(async(result) => {
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const secret = credential.secret;
      setSecret(secret);
      const user = result.user;
      setTwitterData({ ...user, ...{ secret, token } });
      let url =
        "http://localhost:5001/texture-punx/us-central1/getFollowing";
        ;
        
      const uid = user.providerData[0]["uid"];
      
      const response = await fetch(url, {
        method: "POST", 
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token, secret, uid })
      });
      
      const res = await response.json();

      let m = "";
      if (res.relationship.target.following) {
        m = "Following!";
      } else {
        m = "Not following";
}
      alert(m);
   
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        console.log('in error');
        console.log(error);
        // ...
      });
  };

  return (
    <>
      <button onClick={authHandler} className="verify-twitter-account-button purple-bg btn btn-lg text-uppercase d-block">
        {!twitterData?<span>Verify Your Twitter</span>:
        <span>Twitter Verified</span>}
      </button>
    </>
  );
};

export default VerifyTwitterButton;