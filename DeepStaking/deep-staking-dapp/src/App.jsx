import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { configureChains, WagmiConfig } from 'wagmi'
import Wallets from './components/Wallet/Wallets'
import { config } from './config'

function App() {
  const [count, setCount] = useState(0)

  return (
   <WagmiConfig config={config}>

    <Wallets />
   </WagmiConfig>
  )
}

export default App
