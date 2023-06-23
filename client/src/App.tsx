import './App.css';
import { createConfig, configureChains, mainnet } from 'wagmi';

import { publicProvider } from 'wagmi/providers/public';

import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import Home from './Home';
// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

// Pass config to React Context Provider
function App() {
  return <Home />;
}

export default App;
