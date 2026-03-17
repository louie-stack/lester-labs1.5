'use client'

import { Navbar } from '@/components/layout/Navbar'
import { AirdropForm } from '@/components/airdrop/AirdropForm'
import { ToolHero } from '@/components/shared/ToolHero'

export default function AirdropPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <ToolHero
        category="Mass Distribution"
        title="Lester"
        titleHighlight="Dropper"
        subtitle="Send tokens to hundreds of wallets in a single transaction. CSV import supported."
        color="#36D1DC"
        stats={[
          { label: 'Wallets', value: 'Hundreds' },
          { label: 'Import', value: 'CSV' },
          { label: 'Tx', value: 'Single' },
        ]}
      />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px clamp(16px,4vw,40px) 80px' }}>
        <AirdropForm />
      </div>
    </div>
  )
}
