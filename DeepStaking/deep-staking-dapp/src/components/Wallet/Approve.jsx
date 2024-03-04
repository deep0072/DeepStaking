import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { parseEther } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

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

import { useEffect } from "react";
import useStakeStore from "../store/StakeStore";

import useRewardStore from "../store/RewardStore";
import useWalletBalance from "../store/WalletBalanceStore";

export const Approve = ({ userAddress }) => {
  const { timeStamp, setStakeBalance } = useStakeStore();
  const { setReward } = useRewardStore();
  const { setWalletBalance } = useWalletBalance();

  const [confirmedTxn, setConfirmedTxn] = useState({
    approve: "",
    staking: "",
  });
  const [amount, setAmount] = useState("");

  const {
    data: hashApprove,
    writeContract: writeContractApprove,
    isPending: isPendingApprove,
    status: statusApprove,
  } = useWriteContract();
  const {
    data: hashStake,
    writeContract: writeContractStake,
    isPending: isPendingStake,
    status: statusStake,
  } = useWriteContract();

  const handleClick = async () => {
    try {
      // First, approve the token transfer
      writeContractApprove({
        address: rewardTokenAddress,
        abi: RewardAbi,
        functionName: "approve",
        args: [contractAddress, parseEther(amount)],
      });

      setConfirmedTxn(confirmedTxn);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("An error occurred:", error);
    }
  };

  const { isLoading: isConfirmingApprove, isSuccess: isConfirmedApprove } =
    useWaitForTransactionReceipt({
      hash: hashApprove,
    });
  const {
    isLoading: isConfirmingStake,
    isSuccess: isConfirmedStake,
    refetch,
  } = useWaitForTransactionReceipt({
    hash: hashStake,
  });

  console.log("outside useEffect isConfirmedApprove:", isConfirmedApprove);
  console.log(" outside useEffect isConfirmedStake:", isConfirmedStake);

  useEffect(() => {
    console.log(
      "inside the use effect isConfirmedApprove:",
      isConfirmedApprove,
    );
    console.log(" inside the use effect isConfirmedStake:", isConfirmedStake);
    if (isConfirmedApprove && !isConfirmedStake) {
      writeContractStake({
        address: contractAddress,
        abi: deepStakingAbi,
        functionName: "staking",
        args: [parseEther(amount)],
      });

      setConfirmedTxn(confirmedTxn);
      console.log(`stakeHash: ${hashStake}`);
    } else {
      setStakeBalance();

      console.log("isConfirmedStake timeStamp:", timeStamp);

      setStakeBalance(); // here update stakeBalance
      setReward(); // update rewardBalance
      setWalletBalance(); // update wallet balance
    }
  }, [isConfirmedApprove, isConfirmedStake]);

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
          {isPendingApprove ||
          isPendingStake ||
          isConfirmingStake ||
          isConfirmingApprove ? (
            <ButtonLoader props={{"isConfirmingStake":isConfirmingStake,"isConfirmingApprove": isConfirmingApprove}} />
          ) : (
            <Button
              className=" w-40 m-auto mt-5  flex justify-center items-center text-sky-200 border-2 rounded-lg border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
              onClick={handleClick}
            >
              stake
            </Button>
          )}
        </CardFooter>
      </div>
      {/* {isConfirmed && <StakeToken isConfirmed={isConfirmed} amount={amount} />} */}
    </div>
  );
};
