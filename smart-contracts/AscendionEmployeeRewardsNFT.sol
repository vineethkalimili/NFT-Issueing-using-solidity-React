// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./AscendionToken.sol";

contract AscendionEmployeeRewards is ERC721, Pausable, Ownable, ERC721Burnable {
    AscendionToken public contractAscendionTokenInstance;
    using Counters for Counters.Counter;

    uint256 public rewardAmount;

    Counters.Counter private _tokenIdCounter;

    constructor(address contractAscendionToken, uint256 _rewardAmount) ERC721("AscendionEmployeeRewards", "AEA") {
        contractAscendionTokenInstance = AscendionToken(contractAscendionToken);
        rewardAmount = _rewardAmount;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://drive.google.com/file/d/14X5iuJ7esCe_ILNsjiFeqbZfxHMm7qL7/view?usp=sharing";
    }

    function setRewardAmount(uint256 _rewardAmount) public {
        rewardAmount = _rewardAmount;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        contractAscendionTokenInstance.transferTokens(msg.sender, to, rewardAmount);
    }

    function transferFrom(address _from, address , uint256) public view override {
        require(_from == owner(), "Transfer not allowed for soul-bound NFTs.");
        revert("Transfer not allowed for soul-bound NFTs.");
    }

    function safeTransferFrom(address _from, address , uint256) public view override {
        require(_from == owner(), "Transfer not allowed for soul-bound NFTs.");
        revert("Transfer not allowed for soul-bound NFTs.");
    }

    function safeTransferFrom(address _from, address , uint256, bytes memory) public view override {
        require(_from == owner(), "Transfer not allowed for soul-bound NFTs.");
        revert("Transfer not allowed for soul-bound NFTs.");
    }

    function approve(address, uint256) public view override {
        require(msg.sender == owner(), "Approval not allowed for soul-bound NFTs.");
        revert("Approval not allowed for soul-bound NFTs.");
    }

    function setApprovalForAll(address ,bool ) public view override {
        require(msg.sender == owner(), "Approval not allowed for soul-bound NFTs.");
        revert("Approval not allowed for soul-bound NFTs.");
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // Functions from AscendionToken.sol
    function getBalanceOfATK() public view returns (uint256) {
        return contractAscendionTokenInstance.balanceOf(msg.sender);
    }

    // function mintATKTokens (address _to, uint256 _amount) public {
    //     contractAscendionTokenInstance.mint(_to, _amount);
    // }

    function transferATKTokens(address _to, uint256 _amount) public returns (bool) {
        return contractAscendionTokenInstance.transferTokens(msg.sender, _to, _amount);
    }

    function getATKTotalSupply() public view returns (uint256) {
        return contractAscendionTokenInstance.totalSupply();
    }
}