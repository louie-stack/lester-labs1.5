'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { CheckCircle, XCircle, Loader2, ExternalLink, X } from 'lucide-react'

interface TxStatusModalProps {
  isOpen: boolean
  onClose: () => void
  status: 'pending' | 'success' | 'error'
  txHash?: string
  contractAddress?: string
  message?: string
  onRetry?: () => void
}

const EXPLORER_BASE = 'https://sepolia.arbiscan.io'

export function TxStatusModal({
  isOpen,
  onClose,
  status,
  txHash,
  contractAddress,
  message,
  onRetry,
}: TxStatusModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-[#111] p-6 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          {/* Close button */}
          <Dialog.Close className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </Dialog.Close>

          <div className="flex flex-col items-center gap-4 text-center">
            {/* Status icon */}
            {status === 'pending' && (
              <Loader2 size={48} className="animate-spin text-accent" />
            )}
            {status === 'success' && (
              <CheckCircle size={48} className="text-green-400" />
            )}
            {status === 'error' && (
              <XCircle size={48} className="text-red-400" />
            )}

            {/* Title */}
            <Dialog.Title className="text-lg font-semibold text-white">
              {status === 'pending' && 'Transaction Submitted'}
              {status === 'success' && 'Success!'}
              {status === 'error' && 'Transaction Failed'}
            </Dialog.Title>

            {/* Message */}
            {message && (
              <p className="text-sm text-white/60">{message}</p>
            )}
            {status === 'pending' && !message && (
              <p className="text-sm text-white/60">Waiting for confirmation on-chain…</p>
            )}

            {/* Tx hash link */}
            {txHash && (
              <a
                href={`${EXPLORER_BASE}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-accent hover:underline"
              >
                View transaction <ExternalLink size={12} />
              </a>
            )}

            {/* Contract address */}
            {contractAddress && (
              <div className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left">
                <p className="mb-1 text-xs text-white/40">Contract deployed at</p>
                <a
                  href={`${EXPLORER_BASE}/address/${contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-xs text-accent hover:underline break-all"
                >
                  {contractAddress} <ExternalLink size={10} className="shrink-0" />
                </a>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 w-full pt-2">
              {status === 'error' && onRetry && (
                <button
                  onClick={onRetry}
                  className="flex-1 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                >
                  Retry
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 transition-colors"
              >
                {status === 'pending' ? 'Close' : 'Done'}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
