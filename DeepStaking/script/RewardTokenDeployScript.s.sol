pragma solidity ^0.8.13;

import {Script, console2, console} from "forge-std/Script.sol";

import {RewardToken} from "../src/RewardToken.sol";

contract RewardDeployToken is Script {
    function run() public returns (RewardToken) {
        vm.startBroadcast(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80);
        
        RewardToken rewardToken = new RewardToken();
        vm.stopBroadcast();
     

        return rewardToken;
    }
}
