import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import type { Profile, SellerProfile } from '@/types/database'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  sellerProfile: SellerProfile | null
  loading: boolean
  isSeller: boolean
  isAdmin: boolean
  isBuyer: boolean
  refreshProfile: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchProfile(userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (data) setProfile(data)
    return data
  }

  async function fetchSellerProfile(userId: string) {
    const { data } = await supabase
      .from('seller_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    if (data) setSellerProfile(data)
    return data
  }

  async function refreshProfile() {
    if (!user) return
    const p = await fetchProfile(user.id)
    if (p?.role === 'seller') await fetchSellerProfile(user.id)
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setProfile(null)
    setSellerProfile(null)
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        const p = await fetchProfile(session.user.id)
        if (p?.role === 'seller') await fetchSellerProfile(session.user.id)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          const p = await fetchProfile(session.user.id)
          if (p?.role === 'seller') await fetchSellerProfile(session.user.id)
        } else {
          setProfile(null)
          setSellerProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const value: AuthContextType = {
    user,
    session,
    profile,
    sellerProfile,
    loading,
    isSeller: profile?.role === 'seller',
    isAdmin:  profile?.role === 'admin',
    isBuyer:  profile?.role === 'buyer',
    refreshProfile,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
