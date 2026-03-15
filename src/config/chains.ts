import { defineChain } from 'viem'

// Arbitrum Sepolia as proxy until LitVM testnet publishes network constants
export const arbitrumSepolia = {
  id: 421614,
  name: 'Arbitrum Sepolia (LitVM Proxy)',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://sepolia-rollup.arbitrum.io/rpc'] },
  },
  blockExplorers: {
    default: { name: 'Arbiscan', url: 'https://sepolia.arbiscan.io' },
  },
  testnet: true,
} as const

// LitVM mainnet — constants TBA, placeholder structure ready
export const litvm = defineChain({
  id: 0, // TBA — update when LitVM publishes
  name: 'LitVM',
  nativeCurrency: { name: 'zkLTC', symbol: 'zkLTC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.litvm.io'] }, // TBA
  },
  blockExplorers: {
    default: { name: 'LitVM Explorer', url: 'https://explorer.litvm.io' }, // TBA
  },
})

export const supportedChains = [arbitrumSepolia] as const
