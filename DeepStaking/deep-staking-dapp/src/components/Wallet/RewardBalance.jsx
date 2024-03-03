import { contractAddress, deepStakingAbi } from "@/ABI/abi";
import React, { useContext, useEffect, useState } from "react";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";
import useRewardStore from "../store/RewardStore";

export const RewardBalance = ({ userAddress }) => {
  const { timeStamp } = useRewardStore();

  const { data, refetch } = useReadContract({
    abi: deepStakingAbi,
    address: contractAddress,
    functionName: "getReward", // Replace with the actual function name
    args: [userAddress],
  });

  useEffect(() => {
    refetch();
  }, [timeStamp, refetch]);

  console.log("reward balance...", data);

  return <div> {data ? formatEther(data) : 0} reward balance</div>;
};
