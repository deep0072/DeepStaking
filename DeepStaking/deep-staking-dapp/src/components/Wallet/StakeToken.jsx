import React, { useEffect } from 'react'
import { useWriteContract } from 'wagmi';
import GetTotalStakedToken from './GetTotalStakedToken';
import { contractAddress, rewardTokenAddress, RewardAbi,deepStakingAbi } from "../../ABI/abi";
import { parseEther } from "viem";

const StakeToken = ({isConfirmed,amount}) => {
  const {reward,incrReward} = useRewardStore((state) => state.incrReward);

 

    const { data: hash, writeContract, isPending, status } = useWriteContract();
    useEffect(() => {
        if (isConfirmed) {
          
      
    
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