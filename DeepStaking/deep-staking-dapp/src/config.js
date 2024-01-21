import { createConfig } from "wagmi";
import { mainnet, sepolia, localhost } from "wagmi/chains";
import { injected } from "wagmi/connectors";

import { createClient, http } from "viem";

export const config = createConfig({
  chains: [localhost],
  connectors: [injected({ target: "metaMask", shimDisconnect: false })],
  transports: {
    [localhost.id]: http("http://127.0.0.1:8545"),
  },
});
