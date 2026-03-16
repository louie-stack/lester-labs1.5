'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const navLinks = [
  { href: '/launch', label: 'Launch' },
  { href: '/locker', label: 'Locker' },
  { href: '/vesting', label: 'Vesting' },
  { href: '/airdrop', label: 'Airdrop' },
  { href: '/governance', label: 'Governance' },
  { href: '/launchpad', label: 'Launchpad' },
  { href: '/docs', label: 'Docs' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-white hover:opacity-80 transition-opacity">
          <span>🐾</span>
          <span>Lester-Labs</span>
        </Link>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Wallet connect */}
        <div>
          <ConnectButton
            chainStatus="icon"
            showBalance={false}
            accountStatus="avatar"
          />
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-white/5 px-4 py-2 flex gap-1 overflow-x-auto">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`whitespace-nowrap px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
