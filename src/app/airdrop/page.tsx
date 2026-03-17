'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { AirdropForm } from '@/components/airdrop/AirdropForm'

const ACCENT = '#36D1DC'
const R = 54, G = 209, B = 220

export default function AirdropPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div style={{ minHeight: '100vh', background: '#08060E', color: '#F0EEF5', fontFamily: 'Inter, sans-serif', opacity: mounted ? 1 : 0, transition: 'opacity 0.4s ease' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ position: 'relative', padding: 'clamp(120px,12vw,160px) clamp(16px,4vw,40px) clamp(60px,6vw,80px)', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', background: `radial-gradient(ellipse, rgba(${R},${G},${B},0.12) 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', background: `rgba(${R},${G},${B},0.1)`, border: `1px solid rgba(${R},${G},${B},0.25)`, borderRadius: '20px', fontSize: '11px', color: ACCENT, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>Mass Distribution</div>
          <h1 style={{ fontSize: 'clamp(40px,5vw,68px)', fontWeight: 800, color: '#F0EEF5', lineHeight: 1.05, marginBottom: '16px', letterSpacing: '-0.02em', fontFamily: 'Sora, sans-serif' }}>Lester Dropper</h1>
          <p style={{ fontSize: '17px', color: 'rgba(240,238,245,0.5)', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.65 }}>Send tokens to hundreds of wallets in a single transaction. CSV import supported.</p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {([['Wallets','Hundreds'],['Import','CSV'],['Tx','Single']] as [string,string][]).map(([k,v]) => (
              <div key={k} style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', fontSize: '12px', color: 'rgba(240,238,245,0.6)', display: 'flex', gap: '8px' }}>
                <span style={{ color: 'rgba(240,238,245,0.35)' }}>{k}</span>
                <span style={{ color: '#F0EEF5', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px clamp(16px,4vw,40px) 80px' }}>
        <AirdropForm />
      </div>
    </div>
  )
}
