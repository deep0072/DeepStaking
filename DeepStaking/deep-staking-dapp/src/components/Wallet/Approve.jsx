import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { parseEther } from "viem";
import { useSimulateContract, useWriteContract } from "wagmi";

import { contractAddress, rewardTokenAddress, RewardAbi,deepStakingAbi } from "../../ABI/abi";
import { StakeToken } from "./StakeToken";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { ButtonLoader } from "./utils/Loader";
export const Approve = () => {
  const [amount, setAmount] = useState("");


  


  const { data,writeContract,isPending
  } = useWriteContract();

  const handleClick = async()=>{
    console.log(isPending, "isPending")
    
   
    await writeContract({
      address: rewardTokenAddress,
      abi: RewardAbi,
      functionName: "approve",
      args: [contractAddress, parseEther(amount)],
    })

    if (data){
      await writeContract({
        address: contractAddress,
        abi: deepStakingAbi,
        functionName: "staking",
        args: [parseEther(amount)],
})


    }
    

   
  
  
  }

  

  

  return (
    <div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Stake</Label>
        <Input
          className="text-black focus-visible:ring-4 focus-visible:ring-sky-blue-950 focus-visible:ring-offset-2"
          id="name"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Stake your token"
        />
        <CardFooter className="flex justify-content-end">
          {isPending ? (
            <ButtonLoader />
          ) : (
            <Button
              className=" w-40 m-auto mt-5  flex justify-center items-center text-sky-200 border-2 rounded-lg border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
              onClick={handleClick}     >            
           
              Submit
            </Button>
           
          )}
          

          {/* {data && <StakeToken tokenAmount={amount} />} */}
        </CardFooter>
      </div>
    </div>
  );
};
