import { useEffect } from "react";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";
import { contractAddress, deepStakingAbi } from "../../ABI/abi";

import useStakeStore from "../store/StakeStore";

const GetTotalStakedToken = () => {
  const { timeStamp } = useStakeStore();

  const { data, isPending, refetch } = useReadContract({
    abi: deepStakingAbi,
    address: contractAddress,
    functionName: "getTotalStakedTokenInContract",
  });
  console.log(data, "isPending in read contract");

  useEffect(() => {
    refetch();
  }, [timeStamp, refetch]);

  return (
    // <div class=" bg-black-900 rounded-md text-center py-4 px-6 flex flex-col items-center">
    //   <div class="bg-green-900 rounded-md text-center py-4 px-6 flex flex-col items-center">
    //   <span class=" text-white text-2xl font-bold">{result.data && formatEther(result?.data)}</span>
    //   </div>

    // </div>
    <div className="text-green-400 rounded-lg text-xl border-b-2 border-green-600 hover:shadow-[0_0_4px_#00FF00,0_2px_10px_#00FF00] p-4">
      staked Token :{data && formatEther(data)}
    </div>
  );
};

export default GetTotalStakedToken;
