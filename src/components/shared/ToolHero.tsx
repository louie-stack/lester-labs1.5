'use client'

import { useEffect, useRef } from 'react'

interface StatPill {
  label: string
  value: string
}

interface ToolHeroProps {
  category: string        // e.g. "Token Creation"
  title: string           // e.g. "Lester Minter"
  titleHighlight?: string // second word/phrase to gradient — if omitted, full title gets color
  subtitle: string
  color: string           // hex e.g. "#6B4FFF"
  stats: StatPill[]
}

// Parse hex to rgb numbers
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

export function ToolHero({ category, title, titleHighlight, subtitle, color, stats }: ToolHeroProps) {
  const headerRef = useRef<HTMLDivElement>(null)
  const [r, g, b] = hexToRgb(color)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    )

    el.querySelectorAll('.reveal, .title-reveal, .sub-reveal, .reveal-scale').forEach((node) => {
      observer.observe(node)
    })

    // Trigger immediately since hero is above fold
    setTimeout(() => {
      el.querySelectorAll('.reveal, .title-reveal, .sub-reveal, .reveal-scale').forEach((node) => {
        node.classList.add('visible')
      })
    }, 80)

    return () => observer.disconnect()
  }, [])

  const baseName = titleHighlight ? title.replace(titleHighlight, '').trim() : title

  return (
    <div
      ref={headerRef}
      style={{
        position: 'relative',
        padding: 'clamp(120px,12vw,160px) clamp(16px,4vw,40px) clamp(64px,7vw,96px)',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        textAlign: 'center',
      }}
    >
      {/* Ambient glow blob */}
      <div style={{
        position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '500px',
        background: `radial-gradient(ellipse, rgba(${r},${g},${b},0.14) 0%, rgba(${r},${g},${b},0.04) 45%, transparent 70%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Horizontal accent lines */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '90%', maxWidth: '900px', height: '1px', pointerEvents: 'none', zIndex: 1,
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '1px', width: '25%',
          background: `linear-gradient(90deg, transparent, rgba(${r},${g},${b},0.3))`,
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, height: '1px', width: '25%',
          background: `linear-gradient(270deg, transparent, rgba(${r},${g},${b},0.3))`,
        }} />
      </div>

      {/* Floating particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        {[
          { left: '12%', top: '28%', delay: '0s', dur: '3.5s', size: '3px' },
          { left: '82%', top: '22%', delay: '0.8s', dur: '4.2s', size: '2px' },
          { left: '22%', top: '72%', delay: '1.5s', dur: '3.8s', size: '3px' },
          { left: '72%', top: '60%', delay: '2.2s', dur: '4.5s', size: '2px' },
          { left: '50%', top: '14%', delay: '0.4s', dur: '3.2s', size: '4px' },
          { left: '91%', top: '48%', delay: '1.8s', dur: '3.6s', size: '3px' },
        ].map((p, i) => (
          <span key={i} style={{
            position: 'absolute',
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: color,
            left: p.left, top: p.top,
            opacity: 0,
            animation: `particleFloat ${p.dur} ease-in-out ${p.delay} infinite`,
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', margin: '0 auto' }}>

        {/* Category chip */}
        <div className="reveal" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '5px 16px',
          background: `rgba(${r},${g},${b},0.1)`,
          border: `1px solid rgba(${r},${g},${b},0.28)`,
          borderRadius: '20px',
          fontSize: '11px', color: color,
          fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          marginBottom: '24px',
        }}>
          {category}
        </div>

        {/* Title */}
        <h1 className="title-reveal" style={{
          fontSize: 'clamp(42px, 6vw, 72px)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          marginBottom: '20px',
          fontFamily: 'Sora, sans-serif',
        }}>
          {titleHighlight ? (
            <>
              <span className="word" style={{ color: '#F0EEF5' }}>{baseName}</span>
              {' '}
              <span
                className="word highlight"
                style={{
                  background: `linear-gradient(135deg, #fff 0%, ${color} 50%, rgba(${r},${g},${b},0.7) 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {titleHighlight}
              </span>
            </>
          ) : (
            <span
              className="word highlight"
              style={{
                background: `linear-gradient(135deg, #fff 0%, #e8e4ff 30%, ${color} 65%, rgba(${r},${g},${b},0.8) 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {title}
            </span>
          )}
        </h1>

        {/* Subtitle */}
        <p className="sub-reveal" style={{
          fontSize: '17px',
          color: 'rgba(240,238,245,0.5)',
          maxWidth: '500px',
          margin: '0 auto 36px',
          lineHeight: 1.7,
        }}>
          {subtitle}
        </p>

        {/* Stat pills */}
        <div className="reveal reveal-delay-1" style={{
          display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap',
        }}>
          {stats.map(({ label, value }) => (
            <div key={label} style={{
              padding: '7px 16px',
              background: `rgba(${r},${g},${b},0.06)`,
              border: `1px solid rgba(${r},${g},${b},0.15)`,
              borderRadius: '10px',
              fontSize: '12px',
              display: 'flex', gap: '10px', alignItems: 'center',
            }}>
              <span style={{ color: 'rgba(240,238,245,0.35)', fontWeight: 500 }}>{label}</span>
              <span style={{ color: '#F0EEF5', fontWeight: 700 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
