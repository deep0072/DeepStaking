// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2, console} from "forge-std/Test.sol";
import {DeepStakingScript} from "../script/DeepStaking.s.sol";
import {RewardToken} from "../src/RewardToken.sol";
import {DeepStaking} from "../src/Staking.sol";

contract CounterTest is Test {
    RewardToken public RewardTokenContract;
    DeepStaking public deepStakingContract;

    uint256 stakeAmount = 12 * 1e18;
    address public Address = 0x0000000000000000000000000000000000000001;

    function setUp() public {
        DeepStakingScript deepStakingScript = new DeepStakingScript();
        (RewardTokenContract, deepStakingContract) = deepStakingScript.run();
        vm.prank(Address);

        // Transfer the tokens to the CounterTest contract
        RewardTokenContract.transfer(address(this), stakeAmount);
    }

    function test_AllowUserToStakeAmount() public {
        console.log(msg.sender, "msg.sender3");

        RewardTokenContract.approve(address(deepStakingContract), stakeAmount);
        deepStakingContract.staking(stakeAmount);

        vm.warp(3600);

        uint256 rewardAmount = deepStakingContract.earned(address(this));
        console.log(rewardAmount, "rewardAmount");
    }
// function testFuzz_SetNumber(uint256 x) public {
} //     counter.setNumber(x);
    //     assertEq(counter.number(), x);
    // }
