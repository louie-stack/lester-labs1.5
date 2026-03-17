'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { SpacesTab } from '@/components/governance/SpacesTab'
import { CreateProposalTab } from '@/components/governance/CreateProposalTab'
import { VoteTab } from '@/components/governance/VoteTab'
import { ToolHero } from '@/components/shared/ToolHero'

type Tab = 'spaces' | 'create' | 'vote'

const COLOR = '#E44FB5'
const TABS: { id: Tab; label: string }[] = [
  { id: 'spaces', label: 'Spaces' },
  { id: 'create', label: 'Create Proposal' },
  { id: 'vote', label: 'Vote' },
]

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState<Tab>('spaces')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <ToolHero
        category="Community Voting"
        title="Lester"
        titleHighlight="Gov"
        subtitle="Off-chain proposals and gasless voting — Snapshot-style, no gas required."
        color={COLOR}
        stats={[
          { label: 'Gas', value: 'Zero' },
          { label: 'Style', value: 'Snapshot' },
          { label: 'Cost', value: 'Free' },
        ]}
      />
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px clamp(16px,4vw,40px) 80px' }}>
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
        {activeTab === 'spaces' && <SpacesTab />}
        {activeTab === 'create' && <CreateProposalTab />}
        {activeTab === 'vote' && <VoteTab />}
      </div>
    </div>
  )
}
