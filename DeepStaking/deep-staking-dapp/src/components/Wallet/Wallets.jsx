import React, { useState } from "react";

import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { injected } from "wagmi/connectors";
import {
  contractAddress,
  rewardTokenAddress,
  deepStakingAbi,
  RewardAbi,
} from "@/ABI/abi";

// import { ReadContractsBalances } from "./ReadContractsBalances";
// import { Approve } from "./Approve.jsx";
// import CardWrapper from "./CardWrapper";
// import WithDraw from "./WithDraw";
import { Button } from "../ui/button";
import GetTotalStakedToken from "./GetTotalStakedToken";
import TruncateEthAddressFromMid from "./utils/truncateAddress";
import AllowanceAmount from "./AllowanceAmount";
import ApproveStakeWrapper from "./ApproveStakeWrapper";
import TotalStakeContextProvider from "../context/TotalStakeContextProvider";
import WithDraw from "./WithDraw";
// import AllowanceAmount from "./AllowanceAmount";

const Wallets = () => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = (e) => {
    let buttonText = e.target.innerText;
    console.log(buttonText, "innerText");
    if (buttonText == "disconnect") {
      disconnect();
    } else {
      const connected_data = connect({ connector: injected() });
    }
  };

  // connect wallet
  // show the address and balance
  const { address, isConnected } = useAccount();

  const result = useBalance({
    address: address,
    unit: "ether",
  });
  console.log(result, "balance");

  const handleClick = () => {
    setReadContract(!readContract);
  };

  return (
    <div>
      {/* connect wallet */}

      <div style={{ position: "fixed", top: 0, right: 0, margin: "20px" }}>
        <Button className="bg-slate-900" onClick={handleConnect}>
          {isConnected ? <h1>disconnect</h1> : <>connectWallet</>}
        </Button>
      </div>

      {isConnected && (
        <div style={{ position: "fixed", top: 0, left: 0, margin: "20px" }}>
          <div className="text-white rounded-lg  border-b-2 border-green-600 hover:shadow-[0_0_4px_#00FF00,0_2px_10px_#00FF00] p-4 ">
            {<TruncateEthAddressFromMid walletAddress={address} />}
          </div>

          <div className=" mt-8 bg-black-500 text-white-200  rounded-lg border-b-2 border-green-600  hover:shadow-[0_1px_3px_#00FF00,0_1px_1px_#00FF00,1px_0_1px_#00FF00] p-4">
            <div className="text-green-400" style={{ mx: "20px" }}>
              {result.data?.formatted} eth
            </div>
          </div>
        </div>
      )}

      <div className="text-white">
        {isConnected && (
          <TotalStakeContextProvider>
            <GetTotalStakedToken />
          </TotalStakeContextProvider>
        )}

        {isConnected && (
          <AllowanceAmount
            rewardTokenAddress={rewardTokenAddress}
            deepStakingAddress={contractAddress}
            rewardAbi={RewardAbi}
          />
        )}

        {address && <ApproveStakeWrapper />}
        <div className="mt-10">{address && <WithDraw />}</div>
        
      </div>
    </div>
  );
};

export default Wallets;
