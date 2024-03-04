import { contractAddress, deepStakingAbi } from "@/ABI/abi";
import React, { useEffect } from "react";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";
import useRewardStore from "../store/RewardStore";
import { Button } from "../ui/button";

export const ClaimedReward = ({ userAddress }) => {
  const { timeStamp } = useRewardStore();

  const { data, refetch } = useReadContract({
    abi: deepStakingAbi,
    address: contractAddress,
    functionName: "getTotalRewardsClaimedByUser", // Replace with the actual function name
    args: [userAddress],
  });

  useEffect(() => {
    refetch();
  }, [timeStamp, refetch]);

  return (
    <>
      <Button className="m-auto mt-5 bg-black-500  flex justify-center items-center text-yellow-200  hover:shadow-[0_0_2px_#DAA520,inset_0_0_2px_#DAA520,0_0_5px_#DAA520,0_0_15px_#DAA520,0_0_30px_#DAA520] p-4]">
        {data && formatEther(data)} reward{" "}
      </Button>
    </>
  );
};
