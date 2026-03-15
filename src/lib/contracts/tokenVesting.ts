export const VESTING_FACTORY_ABI = [
  {
    name: 'createVestingSchedule',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'beneficiary', type: 'address' },
      { name: 'totalAmount', type: 'uint256' },
      { name: 'startTime', type: 'uint256' },
      { name: 'cliffDuration', type: 'uint256' },
      { name: 'vestingDuration', type: 'uint256' },
      { name: 'revocable', type: 'bool' },
    ],
    outputs: [{ name: 'vestingId', type: 'uint256' }],
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
] as const

export const VESTING_FACTORY_ADDRESS =
  '0x0000000000000000000000000000000000000000' as `0x${string}`

// Flat fee: 0.03 zkLTC
export const VESTING_FEE = BigInt('30000000000000000')
