import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { localhost } from 'viem/chains'
 
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
 
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

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