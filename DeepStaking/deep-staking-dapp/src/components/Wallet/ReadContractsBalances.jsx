import React, {useState } from "react";
import { parseEther } from "viem";
import {
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";


import { contractAddress, deepStakingAbi,rewardTokenAddress,RewardAbi } from "../../ABI/abi";
import { StakeToken } from "./StakeToken";

const stakingContract = {
  address: contractAddress,
  abi: deepStakingAbi,
};




export const ReadContractsBalances = () => {
  const { data, isError, isLoading, isSuccess, warning, error } =
    useContractReads({
      contracts: [
        {
          ...stakingContract,
          functionName: "getTotalStakedTokenInContract",
        },
      ],
    });
 

  return (
    <div className="text-white" >
      <h1>total staked token in contract is {data? data[0].result?.toString():"no data"}</h1>
    </div>
  );
};







