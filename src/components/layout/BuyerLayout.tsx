import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, Heart, MessageSquare, Settings, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/utils/helpers'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/buyer' },
  { label: 'Orders',    icon: ShoppingBag,     to: '/buyer/orders' },
  { label: 'Wishlist',  icon: Heart,           to: '/buyer/wishlist' },
  { label: 'Messages',  icon: MessageSquare,   to: '/buyer/messages' },
  { label: 'Settings',  icon: Settings,        to: '/buyer/settings' },
]

export default function BuyerLayout() {
  const { profile, signOut } = useAuth()
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-100
                      flex items-center justify-around px-2 py-2 safe-area-pb">
        {navItems.slice(0,5).map(item => {
          const active = pathname === item.to || (item.to !== '/buyer' && pathname.startsWith(item.to))
          return (
            <Link key={item.to} to={item.to}
              className={cn('flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all',
                active ? 'text-forest' : 'text-muted')}>
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <div className="w-56 h-screen sticky top-0 bg-white border-r border-gray-100 flex flex-col">
          <div className="p-5 border-b border-gray-100">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl">🕌</span>
              <span className="font-serif font-bold text-forest">SouqHalal</span>
            </Link>
          </div>
          <nav className="flex-1 p-3 space-y-0.5">
            {navItems.map(item => {
              const active = pathname === item.to || (item.to !== '/buyer' && pathname.startsWith(item.to))
              return (
                <Link key={item.to} to={item.to}
                  className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                    active ? 'bg-mint text-forest' : 'text-ink-soft hover:bg-gray-50')}>
                  <item.icon className="w-4 h-4" />{item.label}
                </Link>
              )
            })}
          </nav>
          <div className="p-3 border-t border-gray-100">
            <button onClick={signOut}
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
        <main className="flex-1 p-8"><Outlet /></main>
      </div>

      <main className="lg:hidden p-4 pb-24"><Outlet /></main>
    </div>
  )
}
