require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require('../contract-abi.json') //make JSON of our contract
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"; //deploy and get address using hardhat

export const mintNFT = async (url, name, description) => {

}