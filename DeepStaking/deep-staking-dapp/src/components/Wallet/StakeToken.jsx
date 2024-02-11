import React, { useEffect } from 'react'
import { useWriteContract } from 'wagmi';
import GetTotalStakedToken from './GetTotalStakedToken';
import { contractAddress, rewardTokenAddress, RewardAbi,deepStakingAbi } from "../../ABI/abi";
import { parseEther } from "viem";

const StakeToken = ({isConfirmed,amount}) => {
  console.log(isConfirmed, "confirmed")
  console.log(amount, "amount")
 

    const { data: hash, writeContract, isPending, status } = useWriteContract();
    useEffect(() => {
        if (isConfirmed) {
          console.log(hash, "hash")
      
    
            writeContract({
              address: contractAddress,
              deepStakingAbi,
              functionName: "staking",
              args: [parseEther(amount)],
            });
    
            
        
            
          }
      
    
      
    }, [isConfirmed,amount])
    

    

    // const { isLoading: isConfirming, isSuccess: isConfirmed } =
    // useWaitForTransactionReceipt({
    // hash,
    // });ss
  return (
    <>{hash && hash}</> )
}

export default StakeToken