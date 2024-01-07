import React, { useState } from "react";

import { parseEther } from "viem";

import { contractAddress, deepStakingAbi } from "../../ABI/abi";

import { useContractWrite, usePrepareContractWrite } from "wagmi";
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

export const StakeToken = ({ tokenAmount }) => {
 

  console.log("amount", tokenAmount)
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: deepStakingAbi,
    functionName: "staking",
    args: [parseEther(tokenAmount)],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div>
      <br />

      {/* {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} */}
      { write?.()}
      {/* {btnStatus && (
        <div>
          <Label
            htmlFor="name"
            onChange={(e) => setInput(parseEther(e.target.value))}
          >
            Enter amount
          </Label>
          <Input id="name" placeholder="Stake token" />

          <CardFooter className="flex justify-content-end">
            <Button onClick={handleClick}>Stake</Button>
          </CardFooter>
         
        </div>
      )} */}
    </div>
  );
};
