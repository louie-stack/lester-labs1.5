// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LesterToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable {
    bool public mintable;
    bool public burnable;
    bool public pausable;

    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint8 decimals_,
        bool _mintable,
        bool _burnable,
        bool _pausable,
        address owner
    ) ERC20(name, symbol) Ownable(owner) {
        mintable = _mintable;
        burnable = _burnable;
        pausable = _pausable;
        _mint(owner, totalSupply * (10 ** decimals_));
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(mintable, "Not mintable");
        _mint(to, amount);
    }

    function pause() public onlyOwner {
        require(pausable, "Not pausable");
        _pause();
    }

    function unpause() public onlyOwner {
        require(pausable, "Not pausable");
        _unpause();
    }

    function _update(address from, address to, uint256 value)
        internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}

contract TokenFactory is Ownable {
    uint256 public creationFee;

    event TokenCreated(address indexed tokenAddress, address indexed creator, string name, string symbol);

    constructor(uint256 _creationFee) Ownable(msg.sender) {
        creationFee = _creationFee;
    }

    function createToken(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint8 decimals,
        bool mintable,
        bool burnable,
        bool pausable
    ) external payable returns (address tokenAddress) {
        require(msg.value >= creationFee, "Insufficient fee");

        LesterToken token = new LesterToken(
            name, symbol, totalSupply, decimals,
            mintable, burnable, pausable, msg.sender
        );

        tokenAddress = address(token);
        emit TokenCreated(tokenAddress, msg.sender, name, symbol);
    }

    function setFee(uint256 _fee) external onlyOwner {
        creationFee = _fee;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
