import { useReadContract } from "wagmi";
import { create } from "zustand";
import { contractAddress, deepStakingAbi } from "@/ABI/abi";

// Define your custom hook that uses useReadContract
const useFetchReward = (userAddress) => {
  const fetchReward = async () => {
    const result = useReadContract({
      abi: deepStakingAbi,
      address: contractAddress,
      functionName: "claimedReward",
      args: [userAddress]
    });

    console.log(result, "result")
    return result;
  };

  return fetchReward;
};

// Create your Zustand store
export const useRewardStore = create((set,get) => {
    console.log(get.userAddress, "set get")
  const fetchReward = useFetchReward(get.userAddress);


  return {
    reward:  0,
    incrReward: async () => {
      const result = await fetchReward();
      console.log('Fetched reward:', result);
      set((state) => ({ reward: result.data && formatEther(result?.data) }));
    },
  };
});
