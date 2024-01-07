import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { parseEther } from "viem";
import {
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import {
  contractAddress,
  deepStakingAbi,
  rewardTokenAddress,
  RewardAbi,
} from "../../ABI/abi";
import { StakeToken } from "./StakeToken";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { ButtonLoader } from "./utils/Loader";
export const Approve = () => {
  const [amount, setAmount] = useState("");
  const [visible, setVisible] = useState(false);

  const { config } = usePrepareContractWrite({
    address: rewardTokenAddress,
    abi: RewardAbi,
    functionName: "approve",
    args: [contractAddress, parseEther(amount)],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const handleClick = () => {
    console.log("clicked");
    if (amount > 0){
      write?.();
      setVisible(!visible);

    }

   
  };

  console.log(isSuccess,"isSuccess")

  return (
    <div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Stake</Label>
        <Input
          className="text-black"
          id="name"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Stake your token"
        />
        <CardFooter className="flex justify-content-end">
        {isLoading?<ButtonLoader />: <Button   className=" w-40 m-auto mt-5  flex justify-center items-center text-sky-200 border-2 rounded-lg border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]" onClick={handleClick}>Submit</Button>}
          {isSuccess && <StakeToken  tokenAmount={amount}/>}
        </CardFooter>
      </div>

    
    </div>
  );
};
