async function main() {
    const [deployer] = await ethers.getSigners();
  
    const TexturePunk = await ethers.getContractFactory("texture_punks");
    const texture_punks = await TexturePunk.deploy("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","0x11B3390de235f67De10dFE50e416C4C393Fedd21");
    console.log("Token address:", texture_punks.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });