import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNGN(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency', currency: 'NGN',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric', month: 'short', year: 'numeric',
  }).format(new Date(date))
}

export function formatRelativeTime(date: string): string {
  const diff = Date.now() - new Date(date).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins  < 1)  return 'Just now'
  if (mins  < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days  < 7)  return `${days}d ago`
  return formatDate(date)
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function truncate(text: string, maxLen: number): string {
  return text.length > maxLen ? text.slice(0, maxLen) + '…' : text
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export function getPlanLabel(tier: string): string {
  return { free: 'Free', growth: 'Growth', featured: 'Featured' }[tier] ?? tier
}

export function getPlanColor(tier: string): string {
  return {
    free:     'badge-gray',
    growth:   'badge-green',
    featured: 'badge-gold',
  }[tier] ?? 'badge-gray'
}

export function getOrderStatusColor(status: string): string {
  return {
    pending:    'badge-gray',
    confirmed:  'badge-blue',
    processing: 'badge-blue',
    shipped:    'badge-gold',
    delivered:  'badge-green',
    cancelled:  'badge-red',
    refunded:   'badge-red',
  }[status] ?? 'badge-gray'
}

export function getVerificationBadge(status: string) {
  return {
    verified:   { label: '✓ Verified',   cls: 'badge-green' },
    pending:    { label: '⏳ Pending',    cls: 'badge-gold'  },
    unverified: { label: 'Unverified',    cls: 'badge-gray'  },
    rejected:   { label: 'Rejected',      cls: 'badge-red'   },
  }[status] ?? { label: status, cls: 'badge-gray' }
}

export function buildWhatsAppUrl(phone: string, productTitle?: string, storeUrl?: string): string {
  const msg = productTitle
    ? `As-salamu alaykum! I'm interested in "${productTitle}" on SouqHalal. ${storeUrl ?? ''}`
    : `As-salamu alaykum! I found your store on SouqHalal and would like to inquire.`
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`
}

export function getSupabaseImageUrl(bucket: string, path: string): string {
  const base = import.meta.env.VITE_SUPABASE_URL
  return `${base}/storage/v1/object/public/${bucket}/${path}`
}

export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<string | null> {
  const { createClient } = await import('@supabase/supabase-js')
  const { supabase } = await import('@/lib/supabase')
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true })
  if (error || !data) return null
  return getSupabaseImageUrl(bucket, data.path)
}
