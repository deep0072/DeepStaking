import { createConfig } from "wagmi";
import { mainnet, sepolia, localhost } from "wagmi/chains";
import { injected } from "wagmi/connectors";

import { createClient, http } from "viem";

export const config = createConfig({
  chains: ["sepolia"],
  connectors: [injected({ target: "metaMask", shimDisconnect: false })],
  transports: {
    [localhost.id]: http(process.env.ALCHEMY_RPC_URL),
  },
});
