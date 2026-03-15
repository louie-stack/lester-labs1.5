export const TOKEN_FACTORY_ABI = [
  {
    name: 'createToken',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'totalSupply', type: 'uint256' },
      { name: 'decimals', type: 'uint8' },
      { name: 'mintable', type: 'bool' },
      { name: 'burnable', type: 'bool' },
      { name: 'pausable', type: 'bool' },
    ],
    outputs: [{ name: 'tokenAddress', type: 'address' }],
  },
] as const

// Placeholder address — will be replaced with deployed contract address
export const TOKEN_FACTORY_ADDRESS =
  '0x0000000000000000000000000000000000000000' as `0x${string}`

// Creation fee: 0.05 zkLTC (in wei)
export const CREATION_FEE = BigInt('50000000000000000') // 0.05 * 10^18
