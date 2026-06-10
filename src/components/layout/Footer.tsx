import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-ink text-white pt-16 pb-8">
      <div className="page-wrapper">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-forest to-emerald rounded-xl
                              grid place-items-center text-lg">🕌</div>
              <div>
                <div className="font-serif text-lg font-bold text-gold-light">SouqHalal</div>
                <div className="font-arabic text-xs text-gold">سوق حلال</div>
              </div>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed font-light max-w-[220px]">
              A trusted Islamic marketplace built for the Muslim community.
            </p>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">Marketplace</h5>
            {['Browse All', 'Categories', 'Featured Sellers', 'Ramadan Deals'].map(l => (
              <Link key={l} to="/browse" className="block text-sm text-white/55 hover:text-gold-light
                                                     font-light mb-3 transition-colors">{l}</Link>
            ))}
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">Sellers</h5>
            {[
              { label: 'List Your Business', to: '/auth/signup' },
              { label: 'Seller Dashboard',   to: '/seller' },
              { label: 'Pricing Plans',      to: '/#pricing' },
              { label: 'Get Verified',       to: '/seller/verification' },
            ].map(l => (
              <Link key={l.label} to={l.to} className="block text-sm text-white/55 hover:text-gold-light
                                                        font-light mb-3 transition-colors">{l.label}</Link>
            ))}
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">Company</h5>
            {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map(l => (
              <Link key={l} to="/" className="block text-sm text-white/55 hover:text-gold-light
                                               font-light mb-3 transition-colors">{l}</Link>
            ))}
          </div>
        </div>

        <div className="border-t border-white/7 pt-6 flex flex-col sm:flex-row
                        items-center justify-between gap-3">
          <p className="text-xs text-white/30 font-light">
            © {new Date().getFullYear()} SouqHalal. All rights reserved.
          </p>
          <span className="font-arabic text-sm text-gold opacity-50">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </span>
        </div>
      </div>
    </footer>
  )
}
