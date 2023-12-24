// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2, console} from "forge-std/Script.sol";
import {DeepStaking} from "../src/Staking.sol";
import {RewardDeployToken} from "./RewardTokenDeployScript.s.sol";
import {RewardToken} from "../src/RewardToken.sol";

contract DeepStakingScript is Script {
    function setUp() public {}

    function run() public returns (RewardToken, DeepStaking) {
       
       

       
        vm.startBroadcast(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80);
        
        // console.log(address(rewardToken), "reward token contract");

        RewardToken rewardToken = new RewardToken();
        DeepStaking stakeContract =new DeepStaking(address(rewardToken),address(rewardToken));
            
            

        vm.stopBroadcast();

        return (rewardToken, stakeContract);
    }
}
