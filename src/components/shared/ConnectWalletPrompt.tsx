'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'

export function ConnectWalletPrompt() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="rounded-xl border border-white/10 bg-white/5 px-8 py-10 text-center max-w-sm w-full">
        <div className="mb-3 text-4xl">🔐</div>
        <h3 className="mb-2 text-lg font-semibold text-white">Connect your wallet</h3>
        <p className="mb-6 text-sm text-white/50">Connect your wallet to continue using this utility.</p>
        <div className="flex justify-center">
          <ConnectButton />
        </div>
        <p className="mt-4 text-center" style={{ fontSize: '12px', color: 'rgba(107,107,138,0.7)' }}>
          Need testnet ETH? →{' '}
          <a
            href="https://www.alchemy.com/faucets/arbitrum-sepolia"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#4A9EFF' }}
          >
            Get Arbitrum Sepolia ETH
          </a>{' '}
          from the Alchemy faucet
        </p>
      </div>
    </div>
  )
}
