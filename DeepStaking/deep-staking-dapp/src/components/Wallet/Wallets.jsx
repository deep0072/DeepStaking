import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { ReadContractsBalances } from "./ReadContractsBalances";
import { Approve } from "./Approve.jsx";
import CardWrapper from "./CardWrapper";
import WithDraw from "./WithDraw";
import { Button } from "../ui/button";
import TruncateEthAddressFromMid from "./utils/truncateAddress";


const Wallets = () => {
  const [readContract, setReadContract] = useState(false);
  // connect wallet
  // show the address and balance
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { data, isError } = useBalance({
    address: address,
  });

  const { disconnect } = useDisconnect();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  {
    /* <div className='flex justify-space-between'>
      <button>press me</button>

    </div>
    <div className='flex justify-end'>
      <button >press me</button>

    </div> */
  }

  const handleClick = () => {
    setReadContract(!readContract);
  };

  return (
    <div>
      {isConnected && (
        <div
          
          style={{ position: "fixed", top: 0, left: 0, margin: "20px" }}
        >
          {isConnected && (
            <div className="text-white rounded-lg  border-b-2 border-green-600 hover:shadow-[0_0_4px_#00FF00,0_2px_10px_#00FF00] p-4 ">{<TruncateEthAddressFromMid walletAddress={address} />}</div>
          )}
          <div  className=" mt-8 bg-black-500 text-white-200  rounded-lg border-b-2 border-green-600  hover:shadow-[0_1px_3px_#00FF00,0_1px_1px_#00FF00,1px_0_1px_#00FF00] p-4">
            {isConnected && (
              <div className="text-green-400" style={{ mx: "20px" }}>
               {data?.formatted} eth
              </div>
            )}
          </div>
        </div>
      )}

      {connectors.map((connector) => (
        <div style={{ position: "fixed", top: 0, right: 0, margin: "20px" }}>
          {!isConnected && (
            <Button
              className="bg-slate-900"
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              connect wallet
              {isLoading &&
                pendingConnector?.id === connector.id &&
                " (connecting)"}
            </Button>
          )}
        </div>
      ))}

      {error && <div>{error.message}</div>}

      <div style={{ position: "fixed", top: 0, right: 0, margin: "20px" }}>
        {isConnected && (
          <Button className="bg-slate-900" onClick={() => disconnect()}>
            disconnect
          </Button>
        )}
      </div>
      <div>
        {isConnected && (
          <button
            onClick={handleClick}
            class="text-white bg-green-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            getTotalStakedToken
          </button>
        )}

        {readContract && <ReadContractsBalances />}

        {address && <CardWrapper />}

        {address && <WithDraw />}
      </div>
    </div>
  );
};

export default Wallets;
