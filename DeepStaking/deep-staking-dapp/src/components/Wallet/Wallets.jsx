import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect,useBalance } from "wagmi";
import {Approve, ReadContractsBalances} from "./ReadContractsBalances";

const Wallets = () => {

  const [readContract,setReadContract] = useState(false)
  // connect wallet
  // show the address and balance
  const { address, isConnecting, isDisconnected,isConnected} = useAccount()
  const { data, isError } = useBalance({
    address: address,
  })




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

  const handleClick = ()=>{

   
    setReadContract(!readContract)

  }

  return (
    <>
      <div style={{position: 'fixed', top: 0, left: 0,margin:'20px'}}>
        {isConnected && <div>Connected to {address}</div>}
        {isConnected && <div style={{mx:'20px'}}>balance: {data?.formatted} eth</div>}

      </div>
    
      
      <div >
        

        {connectors.map((connector) => (
          <div style={{position: 'fixed', top: 0, right: 0,margin:'20px'}}>
            {!isConnected &&  <button
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              connect wallet
              {isLoading &&
                pendingConnector?.id === connector.id &&
                " (connecting)"}
            </button>}
           
          </div>
        ))}

        {error && <div>{error.message}</div>}
      </div>

      <div style={{position: 'fixed', top: 0, right: 0,margin:'20px'}}>
        {isConnected && (
          <button class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={() => disconnect()}>disconnect</button>
        )}
      </div>
      <div>
        {isConnected && (
          <button onClick ={handleClick} class="text-white bg-green-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">getTotalStakedToken</button>
        )}
        
        {readContract && <ReadContractsBalances/> }
        
        {address && <Approve />}
      
      </div>
    </>
  );
};

export default Wallets;
