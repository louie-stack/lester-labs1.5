import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { arbitrumSepolia } from './chains'

export const wagmiConfig = getDefaultConfig({
  appName: 'Lester-Labs',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // placeholder — replace with real WalletConnect project ID
  chains: [arbitrumSepolia],
  ssr: true,
})
