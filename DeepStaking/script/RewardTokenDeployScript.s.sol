pragma solidity ^0.8.13;

import {Script, console2, console} from "forge-std/Script.sol";

import {RewardToken} from "../src/RewardToken.sol";

contract RewardDeployToken is Script {
    function run() public returns (RewardToken) {
        vm.startBroadcast();
        RewardToken rewardToken = new RewardToken();
        vm.stopBroadcast();

        return rewardToken;
    }
}
