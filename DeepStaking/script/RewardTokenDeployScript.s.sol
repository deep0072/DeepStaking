pragma solidity ^0.8.13;

import {Script, console2, console} from "forge-std/Script.sol";

import {RewardToken} from "../src/RewardToken.sol";

contract RewardDeployToken is Script {
    function run() public returns (RewardToken) {
        // vm.startBroadcast(0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d);
        
        RewardToken rewardToken = new RewardToken();
        // vm.stopBroadcast();
     

        return rewardToken;
    }
}
