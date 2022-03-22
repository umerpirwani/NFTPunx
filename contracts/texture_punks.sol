// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./recovery.sol";

contract texture_punks is ERC721Enumerable, recovery {

    struct attribs {
        uint8  head;
        uint8  hair_hat;
        uint8  mouth;
        uint8  facial_hair;
        uint8  nose;
        uint8  eyes_eyewear;
        uint8  cyborg_parts;
        uint8  chokers;
        uint8  misc;
    }

    uint256     constant        attribute_fee = 0.2 ether;
    uint256     constant        base_fee      = 0.2 ether;
    uint256     constant        initial_free  = 3;

    mapping(address => bool)    laterMint;
    mapping(uint256 => string)  tokenURIs;
    address                     signer;
    address                     wallet;

    event WalletChanged(address oldWallet, address newWallet);
    event SignerChanged(address oldSigner, address newSigner);


    constructor(address _signer, address _wallet) ERC721("Texture Punks","TPX") {
        signer = _signer;
        wallet = _wallet;
    }

    function changeWallet(address newWallet) external onlyOwner {
         emit WalletChanged(wallet,newWallet);
        wallet  = newWallet;
       
    }

    function changeSigner(address newSigner)external onlyOwner {
         emit SignerChanged(signer,newSigner);
        signer  = newSigner;
    }
    function shift(uint8 val, uint256 sv) internal pure returns (uint256) {
        return uint256(val) << (sv * 8);
    }

    function count_non_zero(uint8 val) internal pure returns (uint256) {
        return val == 0 ? 0 : 1;
    }

    function attrToTokenId(attribs memory a) public pure returns (uint256) {
        return shift(a.head,0) + 
        shift(a.hair_hat,1) +
        shift(a.mouth,2) +
        shift(a.facial_hair,3) +
        shift(a.nose,4) +
        shift(a.eyes_eyewear,5) +
        shift(a.cyborg_parts,6) +
        shift(a.chokers,7) +
        shift(a.misc,8) ;
    }

    function attrCount(attribs memory a) public pure returns (uint256) {
        return shift(a.head,0) + 
        count_non_zero(a.hair_hat) +
        count_non_zero(a.mouth) +
        count_non_zero(a.facial_hair) +
        count_non_zero(a.nose) +
        count_non_zero(a.eyes_eyewear) +
        count_non_zero(a.cyborg_parts) +
        count_non_zero(a.chokers) +
        count_non_zero(a.misc) ;
    }

    function punkHash(address buyer, string calldata uri, attribs memory attributes) public pure returns (uint256 tokenId,bytes32 hash) {
        uint256 tokenId = attrToTokenId(attributes);
        bytes memory t_data = abi.encode(buyer,uri,tokenId);
        return (tokenId,keccak256(t_data));
    }

    function mint(string calldata uri, attribs memory attributes, bytes calldata signature) external payable {
        // uint256 tokenId = attrToTokenId(attributes);
        // bytes memory t_data = abi.encode(msg.sender,uri,tokenId);
        // bytes32 hash = keccak256(t_data);
        (uint256 tokenId, bytes32 hash) = punkHash(msg.sender,uri,attributes);
        require(!_exists(tokenId),"This Punx has already been minted");
        require(signature.length == 65,"Invalid signature length");
        bytes32 sigR = bytes32(signature[0:32]);
        bytes32 sigS = bytes32(signature[32:64]);
        uint8   sigV = uint8(signature[64]);

        bytes32 data =  keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
        );
        address recovered = ecrecover(
                data,
                sigV,
                sigR,
                sigS
            );
        require(signer == recovered,"Invalid authorisation");

        uint256 count = attrCount(attributes);
        uint256 price;
        if (laterMint[msg.sender]) {
            price = attribute_fee * count + base_fee;
        } else {
            if (count < initial_free) {
                price = 0;
            } else {
                price = (count - initial_free) * attribute_fee;
            }
        }
        require(msg.value == price,"Incorrect value sent");
        laterMint[msg.sender] = true;
        _mint(msg.sender,tokenId);
        tokenURIs[tokenId] = uri;
        sendEth(wallet,msg.value);
    }

    function sendEth(address _wallet, uint256 amount) internal {
        ( bool sent, ) = _wallet.call{value: amount}(""); // don't use send or xfer (gas)
        require(sent, "Failed to send Ether");
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory uri) {
        require(_exists(tokenId),"token does not exist");
        return tokenURIs[tokenId];
    }

}