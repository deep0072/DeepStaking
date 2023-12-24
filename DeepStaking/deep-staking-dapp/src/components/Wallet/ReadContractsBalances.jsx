import React, {useState } from "react";
import { parseEther } from "viem";
import {
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";


import { contractAddress, deepStakingAbi,rewardTokenAddress,RewardAbi } from "../../ABI/abi";
import { StakeToken } from "./StakeToken";

const stakingContract = {
  address: contractAddress,
  abi: deepStakingAbi,
};




export const ReadContractsBalances = () => {
  const { data, isError, isLoading, isSuccess, warning, error } =
    useContractReads({
      contracts: [
        {
          ...stakingContract,
          functionName: "getTotalStakedTokenInContract",
        },
      ],
    });
  console.log(data, "data read");

  return (
    <div>
      <h1>total staked token in contract is {data[0].result?.toString()}</h1>
    </div>
  );
};







export const Approve = () => {
  const [input,setInput] = useState('')
  const [disAbled, setDisAbled] = useState(true)


  const { config } = usePrepareContractWrite({
    address: rewardTokenAddress,
    abi: RewardAbi,
    functionName: "approve",
    args:[contractAddress,input]
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  console.log(disAbled, "disAbled")

  const handleClick = ()=>{
    console.log("clicked")
    write?.()
    setDisAbled(!disAbled)


  }
 

  return (
    <div>
 
      <div>
      <input type="number" onChange={(e)=>setInput(parseEther(e.target.value))} />
      </div>
      <br />
    
        <div>
        <button class="text-white bg-green-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"   onClick={handleClick}>
          approve Token
        </button>

        <StakeToken  btnStatus={disAbled}/>
        </div>

      
        
    
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
};
