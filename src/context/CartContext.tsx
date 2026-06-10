import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './AuthContext'
import type { CartItemWithProduct } from '@/types/database'

interface CartContextType {
  items: CartItemWithProduct[]
  count: number
  total: number
  loading: boolean
  addItem: (productId: string, variantId?: string, qty?: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  updateQty: (itemId: string, qty: number) => Promise<void>
  clearCart: () => Promise<void>
  refresh: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [items, setItems] = useState<CartItemWithProduct[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchCart() {
    if (!user) { setItems([]); return }
    setLoading(true)
    const { data } = await supabase
      .from('cart_items')
      .select(`*, products(*, product_images(*)), product_variants(*)`)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setItems((data as CartItemWithProduct[]) ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchCart() }, [user])

  async function addItem(productId: string, variantId?: string, qty = 1) {
    if (!user) return
    const existing = items.find(i => i.product_id === productId && i.variant_id === (variantId ?? null))
    if (existing) {
      await updateQty(existing.id, existing.quantity + qty)
    } else {
      await supabase.from('cart_items').insert({
        user_id: user.id, product_id: productId,
        variant_id: variantId ?? null, quantity: qty,
      })
      await fetchCart()
    }
  }

  async function removeItem(itemId: string) {
    await supabase.from('cart_items').delete().eq('id', itemId)
    setItems(prev => prev.filter(i => i.id !== itemId))
  }

  async function updateQty(itemId: string, qty: number) {
    if (qty <= 0) { await removeItem(itemId); return }
    await supabase.from('cart_items').update({ quantity: qty }).eq('id', itemId)
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity: qty } : i))
  }

  async function clearCart() {
    if (!user) return
    await supabase.from('cart_items').delete().eq('user_id', user.id)
    setItems([])
  }

  const count = items.reduce((s, i) => s + i.quantity, 0)
  const total = items.reduce((s, i) => s + (i.products?.price ?? 0) * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, count, total, loading, addItem, removeItem, updateQty, clearCart, refresh: fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
