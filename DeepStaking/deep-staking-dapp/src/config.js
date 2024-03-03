import { createConfig, http } from "@wagmi/core";
import { mainnet, sepolia, localhost } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia],
  connectors: [injected({ target: "metaMask", shimDisconnect: false })],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_APP_SEPOLIA_ALCHEMY_RPC_URL),
  },
});
