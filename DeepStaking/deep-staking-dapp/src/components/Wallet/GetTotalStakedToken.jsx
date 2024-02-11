import { useContext, useState } from "react";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";
import { contractAddress, deepStakingAbi } from "../../ABI/abi";
import TotalStakeContext from "../context/totalStakedCoinContext";

const GetTotalStakedToken = () => {
  const {status,setStatus}=useContext(TotalStakeContext)
  if (status){
    const result = useReadContract({
      abi: deepStakingAbi,
      address: contractAddress,
      functionName: "getTotalStakedTokenInContract",
    });
 

    return (
      <div>
        {/* <button
          
            class="text-white bg-green-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
          </button> */}
        {result.data && formatEther(result?.data)} dt token
      </div>
    );

  }else{
    setStatus(true)

  }
 
 
  

};

export default GetTotalStakedToken;
