import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Package, ShoppingBag, Flag, Shield, Megaphone, Settings, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/utils/helpers'

const navItems = [
  { label: 'Dashboard',    icon: LayoutDashboard, to: '/admin' },
  { label: 'Sellers',      icon: Users,           to: '/admin/sellers' },
  { label: 'Products',     icon: Package,         to: '/admin/products' },
  { label: 'Orders',       icon: ShoppingBag,     to: '/admin/orders' },
  { label: 'Reports',      icon: Flag,            to: '/admin/reports' },
  { label: 'Verification', icon: Shield,          to: '/admin/verification' },
  { label: 'Campaigns',    icon: Megaphone,       to: '/admin/campaigns' },
  { label: 'Settings',     icon: Settings,        to: '/admin/settings' },
]

export default function AdminLayout() {
  const { signOut } = useAuth()
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-60 h-screen sticky top-0 bg-ink text-white flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl">🕌</span>
            <div>
              <div className="font-serif text-sm font-bold text-gold-light">SouqHalal</div>
              <div className="text-xs text-white/40">Admin Panel</div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(item => {
            const active = pathname === item.to || (item.to !== '/admin' && pathname.startsWith(item.to))
            return (
              <Link key={item.to} to={item.to}
                className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  active ? 'bg-white/15 text-white' : 'text-white/55 hover:bg-white/8 hover:text-white/80')}>
                <item.icon className="w-4 h-4" />{item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={signOut}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
      <main className="flex-1 p-8 min-w-0"><Outlet /></main>
    </div>
  )
}
