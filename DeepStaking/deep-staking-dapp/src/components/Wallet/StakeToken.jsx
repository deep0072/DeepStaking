import React, {useState } from "react";
import { parseEther } from "viem";

import { contractAddress, deepStakingAbi,rewardTokenAddress,RewardAbi } from "../../ABI/abi";

import {
 
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";


export const StakeToken = ({btnStatus}) => {
    const [input,setInput] = useState('')
  
  
    console.log(btnStatus, "input")
  
    const { config } = usePrepareContractWrite({
      address: contractAddress,
      abi: deepStakingAbi,
      functionName: "staking",
      args:[input]
    });
    const { data, isLoading, isSuccess, write } = useContractWrite(config);
  
    const handleClick = async()=>{
      console.log("clicked")
      await write?.()
  
    }
   
  
    return (
      <div>
   
        <div>
        <input type="number" onChange={(e)=>setInput(parseEther(e.target.value))} />
        </div>
        <br />
      
          <div>
          <button disabled={btnStatus} class="text-white bg-green-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"   onClick={handleClick}>
            stakeToken
          </button>
          </div>
  
        
          
      
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
    );
  };