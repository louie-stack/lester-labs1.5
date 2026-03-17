'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Navbar } from '@/components/layout/Navbar'
import { ConnectWalletPrompt } from '@/components/shared/ConnectWalletPrompt'
import { LockForm } from '@/components/locker/LockForm'
import { MyLocks } from '@/components/locker/MyLocks'
import { ToolHero } from '@/components/shared/ToolHero'

type Tab = 'create' | 'my-locks'

const COLOR = '#2DCE89'
const TABS: { id: Tab; label: string }[] = [
  { id: 'create', label: 'Create Lock' },
  { id: 'my-locks', label: 'My Locks' },
]

export default function LockerPage() {
  const { isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<Tab>('create')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <ToolHero
        category="LP Security"
        title="Lester"
        titleHighlight="Lockup"
        subtitle="Lock LP tokens on-chain with time-based release and shareable lock certificates."
        color={COLOR}
        stats={[
          { label: 'Proof', value: 'On-chain' },
          { label: 'Certificate', value: 'Shareable' },
          { label: 'Trust', value: 'Day one' },
        ]}
      />
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px clamp(16px,4vw,40px) 80px' }}>
        {!isConnected ? (
          <ConnectWalletPrompt />
        ) : (
          <>
            <div style={{
              display: 'flex', gap: '4px', padding: '4px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', marginBottom: '32px',
            }}>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1, padding: '10px 20px', borderRadius: '9px',
                    border: 'none', cursor: 'pointer',
                    fontSize: '13px', fontWeight: 600,
                    transition: 'all 0.2s',
                    background: activeTab === tab.id ? COLOR : 'transparent',
                    color: activeTab === tab.id ? '#fff' : 'rgba(240,238,245,0.45)',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {activeTab === 'create' && <LockForm />}
            {activeTab === 'my-locks' && <MyLocks />}
          </>
        )}
      </div>
    </div>
  )
}
