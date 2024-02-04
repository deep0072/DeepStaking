import React, { useState } from "react";

import { parseEther } from "viem";

import { contractAddress, deepStakingAbi } from "../../ABI/abi";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { useWriteContract } from "wagmi";

export const StakeToken = ({ tokenAmount }) => {


  return (
    <div>
      {writeContract({
                address: contractAddress,
                abi: deepStakingAbi,
                functionName: "staking",
                args: [parseEther(tokenAmount)],
      })}
    </div>
  );
};
