import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, Bell, Menu, X, Search, ChevronDown, User } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { cn } from '@/utils/helpers'

const categories = [
  { name: 'Halal Food',     slug: 'halal-food',    emoji: '🥩' },
  { name: 'Modest Fashion', slug: 'modest-fashion', emoji: '👗' },
  { name: 'Islamic Books',  slug: 'islamic-books',  emoji: '📖' },
  { name: 'Prayer Items',   slug: 'prayer-items',   emoji: '📿' },
  { name: 'Islamic Gifts',  slug: 'islamic-gifts',  emoji: '🎁' },
  { name: 'Sunnah & Herbal',slug: 'sunnah-herbal',  emoji: '🌿' },
]

export default function Navbar() {
  const { user, profile, isSeller, isAdmin, signOut } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [scrolled, setScrolled]     = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dropOpen, setDropOpen]     = useState(false)
  const [searchQ, setSearchQ]       = useState('')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setDrawerOpen(false) }, [pathname])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQ.trim()) navigate(`/browse?q=${encodeURIComponent(searchQ.trim())}`)
  }

  function getDashboardLink() {
    if (isAdmin)  return '/admin'
    if (isSeller) return '/seller'
    return '/buyer'
  }

  return (
    <>
      {/* ── Main Nav ── */}
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'h-14 bg-cream/96 backdrop-blur-xl shadow-soft border-b border-gray-100'
          : 'h-16 bg-cream/90 backdrop-blur-lg border-b border-gray-100/60'
      )}>
        <div className="page-wrapper h-full flex items-center gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-forest to-emerald rounded-lg
                            grid place-items-center text-base shadow-green/30 shadow-md">
              🕌
            </div>
            <div className="hidden sm:block">
              <div className="font-serif text-base font-bold text-forest leading-none">SouqHalal</div>
              <div className="font-arabic text-xs text-gold leading-none">سوق حلال</div>
            </div>
          </Link>

          {/* Search bar — desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search halal products, sellers..."
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                className="input pl-9 pr-4 py-2.5 text-sm rounded-full border-gray-200
                           focus:ring-emerald/20 focus:border-emerald"
              />
            </div>
          </form>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Browse dropdown */}
            <div className="relative" onMouseEnter={() => setDropOpen(true)} onMouseLeave={() => setDropOpen(false)}>
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm
                                 font-medium text-ink-soft hover:text-forest hover:bg-mint/50 transition-all">
                Browse <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', dropOpen && 'rotate-180')} />
              </button>
              {dropOpen && (
                <div className="absolute top-full left-0 pt-2 w-72 animate-slide-down">
                  <div className="bg-white rounded-2xl shadow-lifted border border-gray-100 p-3 grid grid-cols-2 gap-1">
                    {categories.map(cat => (
                      <Link key={cat.slug} to={`/category/${cat.slug}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                                   text-ink-soft hover:bg-mint hover:text-forest transition-all">
                        <span>{cat.emoji}</span>{cat.name}
                      </Link>
                    ))}
                    <Link to="/browse" className="col-span-2 mt-1 px-3 py-2 rounded-lg text-xs
                                                  font-semibold text-emerald hover:bg-mint text-center transition-all">
                      View all categories →
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/browse" className="px-3 py-2 rounded-lg text-sm font-medium
                                          text-ink-soft hover:text-forest hover:bg-mint/50 transition-all">
              Sellers
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-mint/50 transition-all">
              <ShoppingCart className="w-5 h-5 text-ink-soft" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-forest text-white
                                 text-[10px] font-bold rounded-full grid place-items-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

            {user ? (
              <>
                {/* Notifications */}
                <Link to={`${getDashboardLink()}/notifications`}
                  className="hidden sm:block relative p-2 rounded-lg hover:bg-mint/50 transition-all">
                  <Bell className="w-5 h-5 text-ink-soft" />
                </Link>

                {/* Profile menu */}
                <Link to={getDashboardLink()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                             bg-forest text-white text-sm font-medium hover:bg-emerald transition-all">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:block">
                    {profile?.display_name ?? profile?.full_name?.split(' ')[0] ?? 'Dashboard'}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth/login"
                  className="hidden sm:block px-4 py-2 rounded-lg border border-gray-200
                             text-sm font-medium text-ink-soft hover:border-emerald
                             hover:text-emerald hover:bg-mint/30 transition-all">
                  Sign In
                </Link>
                <Link to="/auth/signup"
                  className="px-4 py-2 rounded-lg bg-forest text-white text-sm
                             font-semibold hover:bg-emerald transition-all shadow-green/20 shadow-md">
                  List Free
                </Link>
              </>
            )}

            {/* Hamburger */}
            <button onClick={() => setDrawerOpen(!drawerOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-mint/50 transition-all">
              {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div className={cn(
        'fixed inset-0 z-40 lg:hidden transition-all duration-300',
        drawerOpen ? 'pointer-events-auto' : 'pointer-events-none'
      )}>
        {/* Backdrop */}
        <div onClick={() => setDrawerOpen(false)}
          className={cn('absolute inset-0 bg-ink/20 backdrop-blur-sm transition-opacity',
            drawerOpen ? 'opacity-100' : 'opacity-0')} />

        {/* Panel */}
        <div className={cn(
          'absolute top-14 left-0 right-0 bg-cream border-b border-gray-100',
          'shadow-lifted transition-all duration-300 max-h-[80vh] overflow-y-auto',
          drawerOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        )}>
          <div className="p-4 space-y-1">

            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input type="text" placeholder="Search products..."
                  value={searchQ} onChange={e => setSearchQ(e.target.value)}
                  className="input pl-9 py-2.5 text-sm rounded-full" />
              </div>
            </form>

            <p className="text-xs font-bold text-muted uppercase tracking-widest px-3 pb-1">Categories</p>
            {categories.map(cat => (
              <Link key={cat.slug} to={`/category/${cat.slug}`}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm
                           text-ink-soft hover:bg-mint hover:text-forest transition-all">
                <span className="text-lg">{cat.emoji}</span>{cat.name}
              </Link>
            ))}

            <div className="border-t border-gray-100 my-3" />

            {user ? (
              <>
                <Link to={getDashboardLink()}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-forest">
                  <User className="w-4 h-4" /> My Dashboard
                </Link>
                <button onClick={signOut}
                  className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl
                             text-sm text-red-500 hover:bg-red-50 transition-all">
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/auth/login"
                  className="btn btn-md btn-secondary w-full justify-center">Sign In</Link>
                <Link to="/auth/signup"
                  className="btn btn-md btn-primary w-full justify-center">List Your Business Free</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}
