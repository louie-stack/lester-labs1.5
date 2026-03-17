'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Navbar } from '@/components/layout/Navbar'
import { ConnectWalletPrompt } from '@/components/shared/ConnectWalletPrompt'
import { VestingForm } from '@/components/vesting/VestingForm'
import { MySchedules } from '@/components/vesting/MySchedules'
import { ToolHero } from '@/components/shared/ToolHero'

type Tab = 'create' | 'my'

const COLOR = '#F5A623'
const TABS: { id: Tab; label: string }[] = [
  { id: 'create', label: 'Create Schedule' },
  { id: 'my', label: 'My Schedules' },
]

export default function VestingPage() {
  const { isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<Tab>('create')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <ToolHero
        category="Token Distribution"
        title="Lester"
        titleHighlight="Vester"
        subtitle="Create vesting schedules for teams, investors, and advisors. Auto-release, zero claims."
        color={COLOR}
        stats={[
          { label: 'Schedules', value: 'Linear + Cliff' },
          { label: 'Release', value: 'Automatic' },
          { label: 'Claims', value: 'Zero' },
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
            {activeTab === 'create' ? <VestingForm /> : <MySchedules />}
          </>
        )}
      </div>
    </div>
  )
}
