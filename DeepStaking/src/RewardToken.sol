pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    constructor() ERC20("DeepToken", "DT") {
        _mint(0x0000000000000000000000000000000000000001, 100000 * 1e18);
    }
}
