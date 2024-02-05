// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2, console} from "forge-std/Script.sol";
import {DeepStaking} from "../src/Staking.sol";
import {RewardDeployToken} from "./RewardTokenDeployScript.s.sol";
import {RewardToken} from "../src/RewardToken.sol";

contract DeepStakingScript is Script {
    function setUp() public {}

    function run() public returns (RewardToken, DeepStaking) {
       
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
     

       
        vm.startBroadcast(deployerPrivateKey);
        
        // console.log(address(rewardToken), "reward token contract");

        RewardToken rewardToken = new RewardToken();
        DeepStaking stakeContract =new DeepStaking(address(rewardToken),address(rewardToken));
            
            

        vm.stopBroadcast();

        return (rewardToken, stakeContract);
    }
}
