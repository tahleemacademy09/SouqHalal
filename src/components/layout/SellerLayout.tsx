import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Package, ShoppingBag, BarChart2, MessageSquare,
  Star, Settings, CreditCard, Shield, LogOut, Menu, X, ChevronRight, Store
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { cn, getPlanColor, getPlanLabel } from '@/utils/helpers'

const navItems = [
  { label: 'Dashboard',    icon: LayoutDashboard, to: '/seller' },
  { label: 'Products',     icon: Package,         to: '/seller/products' },
  { label: 'Orders',       icon: ShoppingBag,     to: '/seller/orders' },
  { label: 'Analytics',    icon: BarChart2,        to: '/seller/analytics' },
  { label: 'Messages',     icon: MessageSquare,   to: '/seller/messages' },
  { label: 'Reviews',      icon: Star,            to: '/seller/reviews' },
  { label: 'Verification', icon: Shield,          to: '/seller/verification' },
  { label: 'Billing',      icon: CreditCard,      to: '/seller/billing' },
  { label: 'Settings',     icon: Settings,        to: '/seller/settings' },
]

export default function SellerLayout() {
  const { profile, sellerProfile, signOut } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const Sidebar = ({ mobile = false }) => (
    <div className={cn(
      'flex flex-col h-full bg-forest text-white',
      mobile ? 'w-72' : 'w-60'
    )}>
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white/10 rounded-lg grid place-items-center text-base">🕌</div>
          <div>
            <div className="font-serif text-sm font-bold text-gold-light">SouqHalal</div>
            <div className="font-arabic text-xs text-gold/80">Seller Portal</div>
          </div>
        </Link>
      </div>

      {/* Seller info */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 grid place-items-center text-lg flex-shrink-0">
            {sellerProfile?.logo_url
              ? <img src={sellerProfile.logo_url} alt="" className="w-full h-full object-cover rounded-xl" />
              : '🏪'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {sellerProfile?.business_name ?? 'My Store'}
            </p>
            <span className={cn('badge text-xs', getPlanColor(sellerProfile?.plan_tier ?? 'free'))}>
              {getPlanLabel(sellerProfile?.plan_tier ?? 'free')}
            </span>
          </div>
        </div>
        <Link to={`/store/${sellerProfile?.slug}`} target="_blank"
          className="flex items-center gap-1.5 mt-3 text-xs text-white/50 hover:text-white/80 transition-colors">
          <Store className="w-3 h-3" /> View my store
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
          const active = pathname === item.to || (item.to !== '/seller' && pathname.startsWith(item.to))
          return (
            <Link key={item.to} to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:bg-white/8 hover:text-white/90'
              )}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="p-3 border-t border-white/10">
        <button onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm
                     text-white/50 hover:bg-red-500/10 hover:text-red-400 transition-all">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-shrink-0 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative animate-slide-down">
            <Sidebar mobile />
          </div>
          <button onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-md">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3
                        bg-white border-b border-gray-100 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-serif font-bold text-forest">
            {navItems.find(i => pathname === i.to || (i.to !== '/seller' && pathname.startsWith(i.to)))?.label ?? 'Dashboard'}
          </span>
          <div className="w-9" />
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
