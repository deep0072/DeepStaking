//stake ==> deposit and lock token in smartcontract
// unlock ==> pull out tokens and withdraw from smart contract
// claim reward: users get their reward tokens
//    1.

// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error Staking__TransferFailed();
error Staking__WithdrawalFailed();
error Staking_NeedsMoreThanZero();

contract DeepStaking {
    IERC20 public s_stakingToken;
    IERC20 public s_rewardToken;

    uint256 public constant REWARD_RATE = 5;
    mapping(address => uint256) public s_userRewardPerTokenPaid;

    // a mapping of how much rewards each address has been paid
    mapping(address => uint256) public s_balances;

    // a mapping of how much rewards each address has to claim;
    mapping(address => uint256) public s_rewards;
    uint256 public s_totalStakedToken;
    uint256 public s_rewardPerTokenStored; // this is the exact token will be given to staker as a reward
    uint256 public s_lastUpdateTime;

    constructor(address stakingToken, address rewardToken) {
        s_stakingToken = IERC20(stakingToken);
        s_rewardToken = IERC20(rewardToken);
    }

    modifier moreThanZero(uint256 amount) {
        if (amount <= 0) {
            revert Staking_NeedsMoreThanZero();
        }
        _;
    }

    modifier updateReward(address account) {
        s_rewardPerTokenStored = rewardPerToken();
        s_lastUpdateTime = block.timestamp;
        s_rewards[account] = earned(account);
        s_userRewardPerTokenPaid[account] = s_rewardPerTokenStored;
        _;
    }

    function earned(address account) public view returns (uint256) {
        uint256 accountBalance = s_balances[account];
        uint256 rewardPaid = s_userRewardPerTokenPaid[account];
        uint256 currentRewardPerToken = rewardPerToken();
        uint256 pastReward = s_rewards[account];
        uint256 _earned =
            (
                (accountBalance * (currentRewardPerToken - rewardPaid)) / 1e18
            )
            + pastReward;
        return _earned;
    }

    function rewardPerToken() public view returns (uint256) {
        if (s_totalStakedToken == 0) {
            return s_rewardPerTokenStored;
        }

        // formula to get reward per token ==> 100* (time.rewardrate/ total supply of stakedToken)
        return s_rewardPerTokenStored
            +
            (
                ((block.timestamp - s_lastUpdateTime) * REWARD_RATE * 1e18)
                    / s_totalStakedToken
            );
    }

    function staking(uint256 tokenAmount)
        public
        updateReward(msg.sender)
        moreThanZero(tokenAmount)
    {
        // keep track how muck token user staked
        // how mouch token contract staked
        // transfer token to this contract
        s_balances[msg.sender] += tokenAmount;
        s_totalStakedToken = s_totalStakedToken + tokenAmount;

        // now transfer token from owner to this contract

        bool success =
            s_stakingToken.transferFrom(msg.sender, address(this), tokenAmount);
        if (!success) {
            revert Staking__TransferFailed();
        }
    }

    function withDraw(uint256 amount)
        external
        updateReward(msg.sender)
        moreThanZero(amount)
    {
        require(s_balances[msg.sender] >= amount, "not sufficient balances");
        s_totalStakedToken -= amount;
        s_balances[msg.sender] -= amount;
        bool success = s_stakingToken.transfer(msg.sender, amount);

        if (!success) {
            revert Staking__WithdrawalFailed();
        }
    }

    function claimReward() external updateReward(msg.sender) {
        // how much reward do they get
        // the contract going to emit xtoken /second
        // then disperse the to token staker
        //
        // lets contract emit 100 token/second
        //
        // how reward will be calculated for each user
        // (amount of reward token per second) / (total staked token in contract) = (x *100) == > this is reward amount per user
        //
        // lets say user 1 stake 100 token  for 5 second ==> reward is 500 token
        // lets say user 2 stake 100 token  at 6th second
        // so person 1 will get reward  at 6th second is 50 token ==> total reward from 550
        // person 2 will get reward  at 6th second is 50 token ==> total reward from 50
        uint256 reward = s_rewards[msg.sender];
        bool success = s_rewardToken.transfer(msg.sender, reward);
        if (!success) {
            revert Staking__TransferFailed();
        }
    }
}
