// require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
const ALCHEMY_API_KEY = "F8GJ4ByiSYJBhCSSm8oIUaNQeIsZQrxg";
const ROPSTEN_PRIVATE_KEY = "d7d52d9b87bca8d4f3e8edf951a4ef2f67048e4f4842f80a7ae271b5a649ea56";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {}
    ,
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [ROPSTEN_PRIVATE_KEY]
    }
    
    // kovan: {
    //   url: `https://kovan.infura.io/v3/${process.env.MAINNET_INFURA_ID}`,
    //   accounts: [process.env.PRIV_KEY]
    // },
    // mainnet: {
    //   url: `https://mainnet.infura.io/v3/${process.env.MAINNET_INFURA_ID}`,
    //   from: "0xa4C769a469E487a4Ad30272eB0096A5006d68075",
    //   accounts: [process.env.PRIV_KEY]
    // }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};