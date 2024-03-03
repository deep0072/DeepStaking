import { contractAddress, deepStakingAbi } from "@/ABI/abi";
import React, { useContext, useEffect } from "react";
import { Button } from "../ui/button";
import Lottie from "react-lottie";
import animationData from "../lottie/claimAnimation.json";
import { useWriteContract } from "wagmi";
import { useTransactionReceipt } from "@/hooks/use-transaction-receipt";
import { ButtonLoader } from "./utils/Loader";
import useRewardStore from "../store/RewardStore";
import useWalletBalance from "../store/WalletBalanceStore";

const ClaimReward = ({ userAddress }) => {
  const { setReward } = useRewardStore();
  const { data: hash, writeContract, isPending, status } = useWriteContract();
  const { setWalletBalance } = useWalletBalance();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleClick = () => {
    try {
      writeContract({
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

  useEffect(() => {
    if (isConfirmed) {
      console.log("confirmed reward claim");
      setReward(); // update reward balance and claimed reward
      setWalletBalance();
    }
  }, [isConfirmed]);

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
