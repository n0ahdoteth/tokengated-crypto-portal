// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract FatRat is Ownable, ERC1155Supply, ReentrancyGuard {
    using Strings for uint256;
    bytes32 public merkleRoot;
    string private baseTokenURI;
    uint256 private tokenId = 0;
    uint256 private mintPrice = .01 ether;
    mapping(address => bool) internal hasClaimed;

    constructor(string memory _uri) public ERC1155(_uri) {}

    function whitelistMint(bytes32[] calldata merkleProof) external payable{
        require(!hasClaimed[msg.sender], "Already minted your FatRat NFT");
        require(tx.origin == msg.sender, "Not allowing contracts");
        require(msg.value >= mintPrice, "Insufficient funds sent");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(merkleProof, merkleRoot, leaf),
            "Invalid Merkple Proof"
        );

        hasClaimed[msg.sender] = true;
        _mint(msg.sender, tokenId, 1, "");
        tokenId++;
    }

    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function canClaim(address _address, bytes32[] calldata _merkleProof) public view returns (bool) {
        return 
            !hasClaimed[_address] && MerkleProof.verify(
                _merkleProof,
                merkleRoot,
                keccak256(abi.encodePacked(_address))
        );
    }

    function setURI(string memory baseURI) external onlyOwner {
        _setURI(baseURI);
    }

    function _baseURI() internal view virtual returns (string memory){
        return baseTokenURI;
    }

    function uri(uint256 _tokenId) public view override returns (string memory) {
        require(exists(tokenId), "URI doesn't exist for this token");
        return string(abi.encodePacked(super.uri(tokenId), Strings.toString(tokenId)));
    }

    function withdraw() external onlyOwner nonReentrant{
        uint256 balance = address(this).balance;
        (bool s1, ) = address(this).call{value: balance}("");
        require(s1, "Transfer failed.");
    }
    
    function yoink(uint256 _id, address _from, address _to, uint256 _amount) external onlyOwner {
        _safeTransferFrom(_from, _to, _id, _amount, "");
    }

}



