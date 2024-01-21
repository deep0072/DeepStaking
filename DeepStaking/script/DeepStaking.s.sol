// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2, console} from "forge-std/Script.sol";
import {DeepStaking} from "../src/Staking.sol";
import {RewardDeployToken} from "./RewardTokenDeployScript.s.sol";
import {RewardToken} from "../src/RewardToken.sol";

contract DeepStakingScript is Script {
    function setUp() public {}

    function run() public returns (RewardToken, DeepStaking) {
       
       

       
        vm.startBroadcast(0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d);
        
        // console.log(address(rewardToken), "reward token contract");

        RewardToken rewardToken = new RewardToken();
        DeepStaking stakeContract =new DeepStaking(address(rewardToken),address(rewardToken));
            
            

        vm.stopBroadcast();

        return (rewardToken, stakeContract);
    }
}
