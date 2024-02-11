import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { parseEther } from "viem";
import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import {
  contractAddress,
  rewardTokenAddress,
  RewardAbi,
  deepStakingAbi,
} from "../../ABI/abi";
// import { StakeToken } from "./StakeToken";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { ButtonLoader } from "./utils/Loader";
import StakeToken from "./StakeToken";

export const Approve = () => {
  const [amount, setAmount] = useState("");
  const [confirmedTxn, setConfirmedTxn] = useState(false);

  const { data: hash, writeContract, isPending, status } = useWriteContract();

  const handleClick = async () => {
    try {
      // First, approve the token transfer
      await writeContract({
        address: rewardTokenAddress,
        abi: RewardAbi,
        functionName: "approve",
        args: [contractAddress, parseEther(amount)],
      });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("An error occurred:", error);
    }
  };
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  if (isConfirmed) {
    writeContract({
      address: contractAddress,
      abi: deepStakingAbi,
      functionName: "staking",
      args: [parseEther(amount)],
    });
  }

  return (
    <div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Stake</Label>
        <Input
          className="text-black focus-visible:ring-4 focus-visible:ring-sky-blue-950 focus-visible:ring-offset-2"
          id="name"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Stake your token"
        />
        <CardFooter className="flex justify-content-end">
          {isPending || isConfirming ? (
            <ButtonLoader />
          ) : (
            <Button
              className=" w-40 m-auto mt-5  flex justify-center items-center text-sky-200 border-2 rounded-lg border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
              onClick={handleClick}
            >
              Submit
            </Button>
          )}
        </CardFooter>
      </div>
      {/* {isConfirmed && <StakeToken isConfirmed={isConfirmed} amount={amount} />} */}
    </div>
  );
};
