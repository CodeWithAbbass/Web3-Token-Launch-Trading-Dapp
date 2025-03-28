import { Web3errors } from "web3-errors-extract";
// 1. Get projectId
export const PROJECT_ID = ""; // Replace with your project ID

// 2. Set chains

export const ethereum =
    import.meta.env.VITE_MODE === "production"
        ? {
              chainId: 1,
              name: "Ethereum",
              currency: "ETH",
              explorerUrl: "https://etherscan.io",
              rpcUrl: "https://ethereum-rpc.publicnode.com",
          }
        : {
              chainId: 11155111,
              name: "Sepolia",
              currency: "SepoliaETH",
              explorerUrl: "https://sepolia.etherscan.io",
              rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
          };

// 3. Create modal
export const metadata = {
    name: "Tokenbay",
    description: "",
    url: "",
    icons: ["/images/Profile.png"],
};

export const POOL_ROUTER_ADDRESSES =
    import.meta.env.VITE_MODE == "production"
        ? {
              "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D": "Uniswap V2",
              "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F": "Sushiswap V2",
          }
        : {
              "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008": "Uniswap V2",
              "0xeaBcE3E74EF41FB40024a21Cc2ee2F5dDc615791": "Sushiswap V2",
          };

const FACTORY =
    import.meta.env.VITE_MODE == "production"
        ? "0x7f7E3b780E0452A4167499274Ca4010f8dA30c93"
        : "0x0dB57cd12d4Dca26f06a6953540e4a8B0c538094";
const ROUTER =
    import.meta.env.VITE_MODE == "production"
        ? "0x6d80b7278194456F2dA173609d771453E85478C2"
        : "0xa0bc0dD983E887868FfF8cc136F932E98C7e55db";

// ETHEREUM Contracts
export const FACTORY_ADDRESS = FACTORY;
export const ROUTER_ADDRESS = ROUTER;
export const ZEROADDRESS = "0x0000000000000000000000000000000000000000";
export const maxPriorityFeePerGas = 2000000000;

export const err3 = new Web3errors(ethereum?.rpcUrl, []);
