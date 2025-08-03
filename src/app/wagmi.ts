import { defaultConfig } from "@xellar/kit";
import { type Config } from "wagmi";
import { type Chain } from "viem";
import { liskSepolia } from "viem/chains";

export const localhost = {
  id: 31337,
  name: "HardHat",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["http://aone.my.id:8545/"] },
  },
} as const satisfies Chain;

const walletConnectProjectId = "dbaa6052f4e3126bf053d63cd0acc893"; // https://dashboard.reown.com/
const xellarAppId = "8ca5013f-c527-4ba9-95ae-943c0f42f8eb"; //https://dashboard.xellar.co/

export const wagmiConfig = defaultConfig({
  appName: "Walle Wallet",
  walletConnectProjectId,
  xellarAppId,
  xellarEnv: "sandbox",
  chains: [localhost, liskSepolia],
}) as Config;
