//const { ZERO_ADDRESS, ROLE, Data } = require('./helpers/common');
const { BigNumber } = require("@ethersproject/bignumber");
const { expect } = require("chai");
const { AbiCoder } = require("ethers/lib/utils");
const { ethers, network } = require("hardhat");

describe("Token contract", function () {


    it("beforeAll",async function() {
        if (network.name != "hardhat") {
            console.log("PLEASE USE HARTHAT NETWORK")
            process.exit()
        }
        [owner, addr1, addr2, addr3, addr4,signer, ...addrs] = await ethers.getSigners();
        wallet = "0x31EFd75bc0b5fbafc6015Bd50590f4fDab6a3F22"
        let PUNX = await ethers.getContractFactory("texture_punks")
        punx = await PUNX.deploy(signer.address,wallet)
        coder = ethers.utils.defaultAbiCoder
    })

    it("1.0 a correct mint", async function(){
        punk = {
            head : 1,
            hair_hat : 0,
            mouth : 1,
            facial_hair : 0,
            nose : 0,
            eyes_eyewear : 0,
            cyborg_parts : 0,
            chokers : 0,
            misc : 0
        }
        buyer = addr1.address 
        uri   = "https://some_random_uri/test.json"
        response = await punx.punkHash(buyer,uri,punk)
        hash = ethers.utils.arrayify(response.hash)
        console.log("hash",response.hash)
        console.log("tokenId",response.tokenId.toNumber())
        sig = await signer.signMessage(hash)
        await punx.connect(addr1).mint(uri,punk,sig)
        expect(await punx.balanceOf(addr1.address)).to.equal(1)
        expect(await punx.tokenOfOwnerByIndex(addr1.address,0)).to.equal(response.tokenId)
    })

    it("2.0 a repeat mint", async function(){
        punk = {
            head : 1,
            hair_hat : 0,
            mouth : 1,
            facial_hair : 0,
            nose : 0,
            eyes_eyewear : 0,
            cyborg_parts : 0,
            chokers : 0,
            misc : 0
        }
        buyer = addr1.address 
        uri   = "https://some_random_uri/test.json"
        response = await punx.punkHash(buyer,uri,punk)
        hash = ethers.utils.arrayify(response.hash)
        console.log("hash",response.hash)
        console.log("tokenId",response.tokenId.toNumber())
        sig = await signer.signMessage(hash)
        await expect(punx.connect(addr2).mint(uri,punk,sig)).to.be.revertedWith('This Punx has already been minted')
    })

    it("3.0 another successful mint", async function(){
        punk = {
            head : 1,
            hair_hat : 0,
            mouth : 1,
            facial_hair : 0,
            nose : 2,
            eyes_eyewear : 0,
            cyborg_parts : 0,
            chokers : 0,
            misc : 0
        }
        buyer = addr2.address 
        uri   = "https://some_random_uri/test.json"
        response = await punx.punkHash(buyer,uri,punk)
        hash = ethers.utils.arrayify(response.hash)
        console.log("hash",response.hash)
        console.log("tokenId",response.tokenId.toNumber())
        sig = await signer.signMessage(hash)
        await punx.connect(addr2).mint(uri,punk,sig)
        expect(await punx.balanceOf(addr1.address)).to.equal(1)
        expect(await punx.tokenOfOwnerByIndex(addr2.address,0)).to.equal(response.tokenId)
    })


})