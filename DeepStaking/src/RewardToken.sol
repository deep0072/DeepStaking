pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    address s_owner;

    constructor() ERC20("DeepToken", "DT") {
        _mint(msg.sender, 100000 * 1e18);
        s_owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return s_owner;
    }

    function getOwnerBalance() public view returns (uint256) {
        return balanceOf(s_owner);
    }

    function approveSpending(address spender, uint256 tokenAmount)
        public
        returns (bool)
    {
        bool success = approve(spender, tokenAmount);
        require(success, "not approved");
    }

    function checkTotalApprovedAmount(address spender)
        external
        view
        returns (uint256)
    {
        return allowance(s_owner, spender);
    }
}
