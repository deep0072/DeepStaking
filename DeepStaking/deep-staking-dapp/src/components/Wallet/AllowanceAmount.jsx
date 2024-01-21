import React from "react";
import {useReadContract  } from "wagmi";



const AllowanceAmount = ({rewardTokenAddress, deepStakingAddress,rewardAbi}) => {
  const rewardContract = {
    address: rewardTokenAddress,
    abi: rewardAbi,
  };
  const result =
  useReadContract({
      contracts: [
        {
          ...rewardTokenAddress,
          functionName: "checkTotalApprovedAmount",
          args:[deepStakingAddress]
        },
      ],
    });

  return (
    <div>
      {" "}
      <div className="text-white">
        <h1>
          total approved  token in contract is{" "}
          {result.data ? result.data  : "no data"}
        </h1>
      </div>
    </div>
  );
};

export default AllowanceAmount;
