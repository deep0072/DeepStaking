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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useWriteContract } from "wagmi";

export const StakeToken = ({ tokenAmount }) => {
  const { writeContract } = useWriteContract();

  return (
    <div>
      <div>
        <Label
          htmlFor="name"
          onChange={(e) => setInput(parseEther(e.target.value))}
        >
          Enter amount
        </Label>
        <Input id="name" placeholder="Stake token" />

        <CardFooter className="flex justify-content-end">
          <Button
            onClick={() =>
              writeContract({
                address: contractAddress,
                abi: deepStakingAbi,
                functionName: "staking",
                args: [parseEther(tokenAmount)],
              })
            }
          >
            Stake
          </Button>
        </CardFooter>
      </div>
    </div>
  );
};
