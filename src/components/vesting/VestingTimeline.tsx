'use client'

interface VestingTimelineProps {
  startDate: string
  endDate: string
  cliffDate?: string
  vestingType: 'linear' | 'cliff_linear' | 'custom'
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })
}

export function VestingTimeline({ startDate, endDate, cliffDate, vestingType }: VestingTimelineProps) {
  if (!startDate || !endDate) return null

  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()
  const cliff = cliffDate ? new Date(cliffDate).getTime() : null
  const total = end - start

  const cliffPct = cliff && total > 0 ? Math.min(100, Math.max(0, ((cliff - start) / total) * 100)) : 0

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-wider text-white/40">Vesting Timeline</p>

      {/* Bar */}
      <div className="relative h-8 w-full rounded-full bg-white/5 overflow-hidden">
        {/* Locked region (cliff) */}
        {vestingType === 'cliff_linear' && cliff && (
          <div
            className="absolute inset-y-0 left-0 rounded-l-full"
            style={{
              width: `${cliffPct}%`,
              background: 'linear-gradient(90deg, #f59e0b40, #f59e0b80)',
              borderRight: '2px solid #f59e0b',
            }}
          />
        )}

        {/* Vesting region */}
        <div
          className="absolute inset-y-0 rounded-full"
          style={{
            left: vestingType === 'cliff_linear' && cliff ? `${cliffPct}%` : '0%',
            right: '0%',
            background:
              vestingType === 'cliff_linear'
                ? 'linear-gradient(90deg, #6366f140, #6366f180)'
                : 'linear-gradient(90deg, #6366f140, #6366f1a0)',
          }}
        />

        {/* Cliff marker */}
        {vestingType === 'cliff_linear' && cliff && (
          <div
            className="absolute inset-y-0 w-0.5 bg-amber-400"
            style={{ left: `${cliffPct}%` }}
          />
        )}
      </div>

      {/* Labels */}
      <div className="relative flex items-start text-xs text-white/50">
        <div className="flex flex-col items-start">
          <span className="text-[10px] text-white/30">START</span>
          <span className="font-mono">{formatDateShort(startDate)}</span>
        </div>

        {vestingType === 'cliff_linear' && cliffDate && (
          <div
            className="absolute flex flex-col items-center"
            style={{ left: `${cliffPct}%`, transform: 'translateX(-50%)' }}
          >
            <span className="text-[10px] text-amber-400/70">CLIFF</span>
            <span className="font-mono text-amber-400">{formatDateShort(cliffDate)}</span>
          </div>
        )}

        <div className="ml-auto flex flex-col items-end">
          <span className="text-[10px] text-white/30">END</span>
          <span className="font-mono">{formatDateShort(endDate)}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 pt-1">
        {vestingType === 'cliff_linear' && (
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <span className="inline-block h-2 w-4 rounded-sm bg-amber-500/50" />
            Locked (cliff)
          </div>
        )}
        <div className="flex items-center gap-1.5 text-xs text-white/40">
          <span className="inline-block h-2 w-4 rounded-sm bg-[var(--accent)]/50" />
          Vesting period
        </div>
      </div>
    </div>
  )
}
