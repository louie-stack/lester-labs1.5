'use client'

import { Navbar } from '@/components/layout/Navbar'
import { TokenWizard } from '@/components/launch/TokenWizard'
import { ToolHero } from '@/components/shared/ToolHero'

export default function LaunchPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <ToolHero
        category="Token Creation"
        title="Lester"
        titleHighlight="Minter"
        subtitle="Deploy a custom ERC-20 token on LitVM in under a minute. No code required."
        color="#6B4FFF"
        stats={[
          { label: 'Type', value: 'ERC-20' },
          { label: 'Speed', value: '< 1 min' },
          { label: 'Code', value: 'None' },
        ]}
      />
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px clamp(16px,4vw,40px) 80px' }}>
        <TokenWizard />
      </div>
    </div>
  )
}
