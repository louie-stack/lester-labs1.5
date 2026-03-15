// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/finance/VestingWallet.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VestingFactory is Ownable {
    using SafeERC20 for IERC20;

    uint256 public vestingFee;
    uint256 public scheduleCount;

    event VestingCreated(uint256 indexed vestingId, address indexed vestingWallet, address indexed beneficiary);

    constructor(uint256 _vestingFee) Ownable(msg.sender) {
        vestingFee = _vestingFee;
    }

    function createVestingSchedule(
        address token,
        address beneficiary,
        uint256 totalAmount,
        uint256 startTime,
        uint256 cliffDuration,
        uint256 vestingDuration,
        bool /*revocable*/ // stored for UI purposes; VestingWallet is not revocable by default
    ) external payable returns (uint256 vestingId) {
        require(msg.value >= vestingFee, "Insufficient fee");
        require(vestingDuration > 0, "Duration must be > 0");

        VestingWallet wallet = new VestingWallet(
            beneficiary,
            uint64(startTime + cliffDuration),
            uint64(vestingDuration - cliffDuration)
        );

        IERC20(token).safeTransferFrom(msg.sender, address(wallet), totalAmount);

        vestingId = scheduleCount++;
        emit VestingCreated(vestingId, address(wallet), beneficiary);
    }

    function setFee(uint256 _fee) external onlyOwner {
        vestingFee = _fee;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
