import { WagmiProvider } from "wagmi";

import Wallets from "./components/Wallet/Wallets";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Wallets />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App;
