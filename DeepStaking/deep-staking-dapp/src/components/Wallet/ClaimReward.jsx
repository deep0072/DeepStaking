import { contractAddress, deepStakingAbi } from "@/ABI/abi";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import Lottie from "react-lottie";
import animationData from "../lottie/claimAnimation.json";
import { useReadContract, useWriteContract } from "wagmi";
import { useTransactionReceipt } from "@/hooks/use-transaction-receipt";
import { ButtonLoader } from "./utils/Loader";

import { formatEther } from "viem";
import { useRewardStore } from "@/hooks/use-RewardStore";
import { useEffect } from "react";

const ClaimReward = ({ userAddress }) => {
  const { data: hash, writeContract, isPending, status } = useWriteContract();
  
  const {incrReward} = useRewardStore();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleClick = async () => {
    try {
      await writeContract({
        address: contractAddress,
        abi: deepStakingAbi,
        functionName: "claimReward",
      });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("An error occurred:", error);
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useTransactionReceipt({
      hash,
    });

   

  // useSetRewardBalance({userAddress})

  return (
    <div>
      {isPending || isConfirming ? (
        <ButtonLoader />
      ) : (
        <Button
          onClick={handleClick}
          className=" w-40 m-auto mt-5 bg-black-500  flex justify-center items-center text-yellow-200 border-2 rounded-lg border-yellow-600 hover:shadow-[0_0_2px_#DAA520,inset_0_0_2px_#DAA520,0_0_5px_#DAA520,0_0_15px_#DAA520,0_0_30px_#DAA520] p-4]"
        >
          claim your reward
        </Button>
      )}

      {isConfirmed && (
        <Lottie options={defaultOptions} height={400} width={400} />
      )}
    </div>
  );
};

export default ClaimReward;
