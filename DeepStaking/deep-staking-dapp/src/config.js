import {createConfig, configureChains } from 'wagmi'
import { localhost } from 'viem/chains'
 

import { publicProvider } from 'wagmi/providers/public'
 

import { InjectedConnector } from 'wagmi/connectors/injected'


const { chains, publicClient } = configureChains(
    [localhost],
    [publicProvider()],
  )


// Set up wagmi config
export const config = createConfig({
    autoConnect: false,
    connectors: [
      new InjectedConnector({ chains })],
     
    
    publicClient,
    options: {
      shimDisconnect: false,
    },

  })