'use client'

import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'

export default function NetworkGuard() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain, isPending } = useSwitchChain()

  const isWrongNetwork = isConnected && chainId !== arbitrumSepolia.id

  if (!isWrongNetwork) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: '64px',
        left: 0,
        right: 0,
        zIndex: 200,
        background: 'rgba(255, 184, 0, 0.12)',
        borderBottom: '1px solid rgba(255, 184, 0, 0.3)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        fontFamily: 'monospace',
        fontSize: '13px',
      }}
    >
      <span style={{ color: '#FFB800' }}>
        ⚠ Wrong network — Lester-Labs runs on Arbitrum Sepolia (testnet)
      </span>
      <button
        onClick={() => switchChain({ chainId: arbitrumSepolia.id })}
        disabled={isPending}
        style={{
          padding: '5px 14px',
          background: 'rgba(255,184,0,0.2)',
          border: '1px solid rgba(255,184,0,0.5)',
          borderRadius: '6px',
          color: '#FFB800',
          fontSize: '12px',
          cursor: isPending ? 'not-allowed' : 'pointer',
          fontFamily: 'monospace',
          fontWeight: 600,
        }}
      >
        {isPending ? 'Switching...' : 'Switch Network'}
      </button>
    </div>
  )
}
