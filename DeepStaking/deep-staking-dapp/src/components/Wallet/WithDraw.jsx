import React, { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import { contractAddress, deepStakingAbi } from "../../ABI/abi";
import { Button } from "../ui/button";
import Lottie from "react-lottie";
import animationData from "../lottie/animation.json";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { ButtonLoader } from "./utils/Loader";
import { useTransactionReceipt } from "@/hooks/use-transaction-receipt";
import GetTotalStakedToken from "./GetTotalStakedToken";

import useRewardStore from "../store/RewardStore";
import useStakeStore from "../store/StakeStore";
import useWalletBalance from "../store/WalletBalanceStore";

// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: animationData,
//   rendererSettings: {
//     preserveAspectRatio: 'xMidYMid slice',
//   },
// };
const WithDraw = () => {
  const { setReward } = useRewardStore();
  const { setStakeBalance } = useStakeStore();
  const { setWalletBalance } = useWalletBalance();
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(true);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { data: hash, writeContract, isPending, status } = useWriteContract();

  const handleClick = () => {
    console.log(isPending, "isPending");

    try {
      // First, approve the token transfer
      let txn = writeContract({
        address: contractAddress,
        abi: deepStakingAbi,
        functionName: "withDraw",
        args: [value],
      });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("An error occurred:", error);
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useTransactionReceipt({
      hash,
    });

  useEffect(() => {
    setReward(); // update rewardBalance
    setStakeBalance(); // update stakeBalance
    setWalletBalance(); // update wallet balance
  }, [isConfirmed]);

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className=" w-40 m-auto mt-5 text-black  flex justify-center items-center text-red-700 border-2 rounded-lg border-sky-200 hover:shadow-[0_0_2px_#AA0000,inset_0_0_2px_#AA0000,0_0_5px_#C60C30,0_0_15px_#C60C30,0_0_30px_#FF0800]"
            variant="outline"
          >
            withdraw
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto w-full max-w-sm ">
            <DrawerFooter>
              <Input
                onChange={(e) => {
                  setValue(parseEther(e.target.value));
                }}
                placeholder="enter amount"
              ></Input>
              {isPending || isConfirming ? (
                <ButtonLoader />
              ) : (
                <Button
                  className=" w-40 m-auto mt-5  flex justify-center items-center text-sky-200 border-2 rounded-lg border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
                  onClick={handleClick}
                >
                  Submit
                </Button>
              )}

              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>

            {isConfirmed && (
              <Lottie options={defaultOptions} height={400} width={400} />
            )}
          </div>

          <div style={{ position: "fixed", top: 0, right: 0, margin: 5 }}>
            <GetTotalStakedToken />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default WithDraw;
