// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2, console} from "forge-std/Script.sol";
import {DeepStaking} from "../src/Staking.sol";
import {RewardDeployToken} from "./RewardTokenDeployScript.s.sol";
import {RewardToken} from "../src/RewardToken.sol";

contract DeepStakingScript is Script {
    function setUp() public {}

    function run() public returns (RewardToken, DeepStaking) {
        RewardDeployToken rewardTokenContract = new RewardDeployToken();
        RewardToken rewardToken = rewardTokenContract.run();
        

        vm.startBroadcast();

        // console.log(address(rewardToken), "reward token contract");

        DeepStaking stakeContract =
            new DeepStaking(address(rewardToken),address(rewardToken));

        vm.stopBroadcast();

        return (rewardToken, stakeContract);
    }
}
