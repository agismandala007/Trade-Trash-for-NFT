import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  polygonMumbai
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [
    polygonMumbai, {
      id: 97,
    name: 'Binance Smart Chain Testnet',
    network: 'bsc-testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'BNB',
      symbol: 'tBNB',
    },
    rpcUrls: {
      default: { http: ['https://bsc-testnet.publicnode.com'] },
      public: { http: ['https://bsc-testnet.publicnode.com'] },
    },
    blockExplorers: {
      etherscan: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
      default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 17422483,
      },
    },
    testnet: true,
    }
  ],
  [publicProvider()]
);

const projectId = String(process.env.REACT_APP_WALLET_CONNECT);

const { connectors } = getDefaultWallets({
  appName: 'GreatEdu Final Project Kelompok 2',
  projectId,
  chains
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider 
        chains={chains}
        theme={darkTheme({
          borderRadius: 'medium',
        })}
      >
        <App />
      </RainbowKitProvider>
  </WagmiConfig>
  </React.StrictMode>
);

reportWebVitals();
