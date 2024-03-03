import React, { useContext, useEffect, useState } from "react";

import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { injected } from "wagmi/connectors";

import { Button } from "../ui/button";
import GetTotalStakedToken from "./GetTotalStakedToken";
import TruncateEthAddressFromMid from "./utils/truncateAddress";

import ApproveStakeWrapper from "./ApproveStakeWrapper";

import WithDraw from "./WithDraw";

import ClaimReward from "./ClaimReward";

import { RewardBalance } from "./RewardBalance";

import { ClaimedReward } from "./ClaimedReward";
import useWalletBalance from "../store/WalletBalanceStore";

// import AllowanceAmount from "./AllowanceAmount";

const Wallets = () => {
  const { timeStamp } = useWalletBalance();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = (e) => {
    let buttonText = e.target.innerText;

    if (buttonText == "disconnect") {
      disconnect();
    } else {
      connect({ connector: injected() });
    }
  };

  // connect wallet
  // show the address and balance
  const { address, isConnected } = useAccount();
  console.log(address, "address");

  const { data, refetch } = useBalance({
    address: address,
    unit: "ether",
  });

  useEffect(() => {
    refetch();
  }, [refetch, timeStamp]);

  return (
    <div>
      {!isConnected && (
        <div style={{ position: "fixed", top: 0, right: 0, margin: "20px" }}>
          <Button
            className="bg-slate-900 text-white mt-5 border-2 border-green-600 hover:bg-slate-800"
            onClick={handleConnect}
          >
            connect wallet
          </Button>
        </div>
      )}

      <div>
        {address && (
          <div style={{ position: "fixed", top: 0, right: 0, margin: "20px" }}>
            <Button
              className="bg-slate-900 text-white mt-5 border-2 border-green-600 hover:bg-slate-800"
              onClick={handleConnect}
            >
              {isConnected && <h1>disconnect</h1>}
            </Button>

            <ClaimedReward userAddress={address} />
            <ClaimReward userAddress={address} />
          </div>
        )}

        {address && (
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2">
            <div className=" mt-10 bg-black-500 text-white-200  rounded-lg border-b-2 border-yellow-600  shadow-[0_0_2px_#DAA520,inset_0_0_2px_#DAA520,0_0_5px_#DAA520,0_0_15px_#DAA520,0_0_30px_#DAA520] hover:shadow p-4">
              <div className="text-yellow-200 text-xl" style={{ mx: "20px" }}>
                <RewardBalance userAddress={address} />
              </div>
            </div>
          </div>
        )}

        {isConnected && (
          <div style={{ position: "fixed", top: 0, left: 0, margin: "20px" }}>
            <div className="text-white rounded-lg  border-b-2 border-green-600 hover:shadow-[0_0_4px_#00FF00,0_2px_10px_#00FF00] p-4 ">
              {<TruncateEthAddressFromMid walletAddress={address} />}
            </div>

            <div className=" mt-8 bg-black-500   rounded-lg border-b-2 border-green-600  hover:shadow-[0_1px_3px_#00FF00,0_1px_1px_#00FF00,1px_0_1px_#00FF00] p-4">
              <div className="text-green-400" style={{ mx: "20px" }}>
                {data?.formatted} eth
              </div>
            </div>
            <div>{isConnected && <GetTotalStakedToken />}</div>
          </div>
        )}
      </div>

      <div className="text-white">
        {address && <ApproveStakeWrapper />}
        <div className="mt-10">{address && <WithDraw />}</div>
      </div>
    </div>
  );
};

export default Wallets;
