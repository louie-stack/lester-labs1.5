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
      </div>
    </div>
  )
}
