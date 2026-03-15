// Hardcoded LTC price — replace with live oracle feed when available
const LTC_PRICE_USD = 85.00 // TODO: Replace with live oracle feed (e.g. CoinGecko API)

interface FeeDisplayProps {
  feeLTC: number
  feeLabel: string
}

export function FeeDisplay({ feeLTC, feeLabel }: FeeDisplayProps) {
  const feeUsd = (feeLTC * LTC_PRICE_USD).toFixed(2)

  return (
    <span className="inline-flex items-center gap-1 text-sm text-white/60">
      <span className="text-white/40">{feeLabel}:</span>
      <span className="font-medium text-white">{feeLTC} zkLTC</span>
      <span className="text-white/40">(~${feeUsd} USD est.)</span>
    </span>
  )
}
