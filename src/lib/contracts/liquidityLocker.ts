export const LIQUIDITY_LOCKER_ABI = [
  {
    name: 'lockLiquidity',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'lpToken', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'unlockTime', type: 'uint256' },
      { name: 'withdrawer', type: 'address' },
    ],
    outputs: [{ name: 'lockId', type: 'uint256' }],
  },
  {
    name: 'getLock',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'lockId', type: 'uint256' }],
    outputs: [
      { name: 'lpToken', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'unlockTime', type: 'uint256' },
      { name: 'withdrawer', type: 'address' },
      { name: 'withdrawn', type: 'bool' },
    ],
  },
  {
    name: 'withdraw',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'lockId', type: 'uint256' }],
    outputs: [],
  },
] as const

export const ERC20_APPROVE_ABI = [
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const

export const LIQUIDITY_LOCKER_ADDRESS =
  '0x0000000000000000000000000000000000000000' as `0x${string}`

// Flat fee: 0.03 zkLTC
export const LOCK_FEE = BigInt('30000000000000000')
