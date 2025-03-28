import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import store from "./store/index.js";
import { PROJECT_ID, ethereum, metadata } from "./config/web3.js";

// 1. Your WalletConnect Cloud project ID
const projectId = PROJECT_ID;

// 2. Setup Chain
const chain = [ethereum];

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  // rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  themeMode: "dark",
  ethersConfig,
  chains: [...chain],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
