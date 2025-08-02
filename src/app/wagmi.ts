import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { type Chain } from "viem";
import { monadTestnet } from "viem/chains";
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

const localhost = {
  id: 31337,
  name: "HardHat",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["http://aone.my.id:8545/"] },
  },
} as const satisfies Chain;

export const wagmiConfig = getDefaultConfig({
  appName: 'Walle Wallet',
  projectId: '7bb644316827fd25e86d0655d8964e24', // Dapatkan dari https://cloud.walletconnect.com
  chains: [localhost, monadTestnet],
  transports: {
    [localhost.id]: http(),
    [monadTestnet.id]: http(),
  },
});