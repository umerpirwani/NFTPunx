//this is react function but you can change this to normal function
import React from 'react'
const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
require('dotenv').config();
const PINATA_API_KEY = process.env.REACT_APP_PINATA_KEY;
const PINATA_SECRET_API_KEY = process.env.REACT_APP_PINATA_SECRET;
const pinata = pinataSDK(PINATA_API_KEY, PINATA_SECRET_API_KEY);

function pinImageToPinata(imgPath) {
    const readableStreamForFile = fs.createReadStream(imgPath);
    const options = {};
    
    const getHash = pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        return result["IpfsHash"]//this IPFS hash goto 
    }).catch((err) => {
        console.log(err)
    });    
  return (
    <div>
      ${getHash}
    </div>
  )
}

export default pinImageToPinata



// const PINATA_API_KEY = '00951809b073d0a55e9a';
// const PINATA_SECRET_API_KEY = '3b1089f9a77e2f6cee967aeab3bcda8c9427e519b118f07bbf274ae00993983f';


var imgPath = '' //replace this with GeneratedPunkImage path

