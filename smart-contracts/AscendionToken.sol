// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract AscendionToken is ERC20, ERC20Burnable, Pausable, Ownable, ERC20Permit {
    constructor() ERC20("AscendionToken", "ATK") ERC20Permit("AscendionToken") {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transfer(address, uint256) public view override returns (bool) {
        require(msg.sender == owner(), "Transfer not allowed transferTokens");
        revert("Transfer not allowed use transferTokens");
    }

    function transferTokens(address from, address to, uint256 amount) public returns (bool) {
        require(balanceOf(from) >= amount, "Insufficient balance.");
        _transfer(from, to, amount * 10 ** decimals());
        return true;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}