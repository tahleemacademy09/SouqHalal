import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Heart, Star } from 'lucide-react'

const categories = [
  { emoji: '🥩', name: 'Halal Food',     slug: 'halal-food',    count: 380 },
  { emoji: '👗', name: 'Modest Fashion', slug: 'modest-fashion', count: 210 },
  { emoji: '📖', name: 'Islamic Books',  slug: 'islamic-books',  count: 145 },
  { emoji: '🌿', name: 'Sunnah & Herbal',slug: 'sunnah-herbal',  count: 96  },
  { emoji: '🎁', name: 'Islamic Gifts',  slug: 'islamic-gifts',  count: 174 },
  { emoji: '🕌', name: 'Home Décor',     slug: 'home-decor',     count: 88  },
  { emoji: '📿', name: 'Prayer Items',   slug: 'prayer-items',   count: 120 },
  { emoji: '👶', name: 'Kids & Family',  slug: 'kids-family',    count: 63  },
]

const features = [
  { icon: Shield, title: 'Halal Verified',    desc: 'Every seller declares halal compliance. Community reviews keep standards high.' },
  { icon: Zap,    title: 'No Riba — Ever',    desc: 'Paystack-powered payments with zero interest-based traps or hidden fees.' },
  { icon: Heart,  title: 'Muslim-Owned Only', desc: 'Every business on SouqHalal is owned and operated by a Muslim entrepreneur.' },
  { icon: Star,   title: 'Ramadan Campaigns', desc: 'Seasonal promotions that surge buyers to your store at peak Islamic dates.' },
]

const sellers = [
  { name: 'Barakah Halal Meats', cat: 'Halal Food', city: 'Lagos', rating: 4.9, reviews: 128, ar: 'بركة', bg: 'from-forest to-emerald' },
  { name: 'Noor Modest Wear',    cat: 'Fashion',    city: 'Abuja', rating: 4.8, reviews: 94,  ar: 'نور',  bg: 'from-amber-900 to-gold' },
  { name: 'Maktaba Books',       cat: 'Education',  city: 'Kano',  rating: 5.0, reviews: 57,  ar: 'علم',  bg: 'from-blue-900 to-blue-600' },
]

const plans = [
  {
    tier: 'Free', price: '₦0', per: '/month forever',
    desc: 'Perfect for testing the marketplace.',
    features: ['3 product listings', 'Seller profile page', 'WhatsApp button', 'Community badge'],
    cta: 'Get Started Free', featured: false,
  },
  {
    tier: 'Growth', price: '₦2,000', per: '/month',
    desc: 'For active sellers who want visibility.',
    features: ['20 product listings', 'Halal Verified badge', 'Category placement', 'Reviews & ratings'],
    cta: 'Start Growing', featured: true,
  },
  {
    tier: 'Featured', price: '₦5,000', per: '/month',
    desc: 'Maximum exposure for serious businesses.',
    features: ['Unlimited listings', 'Homepage featured slot', 'Ramadan campaigns', 'Priority support'],
    cta: 'Go Featured', featured: false,
  },
]

export default function LandingPage() {
  const revealRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('opacity-100', 'translate-y-0'); e.target.classList.remove('opacity-0', 'translate-y-8') } })
    }, { threshold: 0.08 })
    revealRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const reveal = (i: number) => (el: HTMLDivElement | null) => { if (el) revealRefs.current[i] = el }

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-[92svh] flex flex-col items-center justify-center
                          text-center px-5 py-24 bg-pattern">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(26,107,74,0.06) 0%, transparent 70%)' }} />

        <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
          <p className="font-arabic text-2xl text-gold mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          <div className="inline-flex items-center gap-2 bg-white border border-gold/20 rounded-full
                          px-4 py-2 mb-8 shadow-sm opacity-0 animate-fade-up"
               style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Halal · Trusted · Muslim-Owned</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl font-light leading-[1.0]
                         tracking-tight mb-5 opacity-0 animate-fade-up"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            The <em className="italic text-emerald">Islamic</em><br />
            marketplace for<br />
            every <span className="text-gold">Muslim</span> home
          </h1>

          <p className="text-base sm:text-lg text-muted font-light leading-relaxed
                        max-w-md mb-10 opacity-0 animate-fade-up"
             style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}>
            Discover halal-verified products from Muslim-owned businesses across Nigeria and beyond.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-16
                          opacity-0 animate-fade-up"
               style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            <Link to="/browse" className="btn btn-xl btn-primary">
              Explore Marketplace <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/auth/signup" className="btn btn-xl btn-secondary">
              List Your Business Free
            </Link>
          </div>

          {/* Stats */}
          <div className="flex bg-white rounded-2xl border border-gray-100 shadow-card
                          overflow-hidden opacity-0 animate-fade-up"
               style={{ animationDelay: '0.85s', animationFillMode: 'forwards' }}>
            {[['2,400+','Verified Sellers'],['18K+','Muslim Buyers'],['12','Categories']].map(([n,l], i) => (
              <div key={i} className={`px-6 sm:px-10 py-5 text-center ${i > 0 ? 'border-l border-gray-100' : ''}`}>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-forest">{n}</div>
                <div className="text-xs text-muted mt-1 font-medium">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="bg-white border-y border-gray-100">
        <div className="page-wrapper">
          <div className="flex flex-wrap items-center justify-center gap-6 py-4">
            {['Halal Verified Sellers','Secure Paystack Payments','Muslim-Owned Only','Community Reviews','Ramadan Campaigns'].map(t => (
              <div key={t} className="flex items-center gap-2 text-xs font-medium text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-jade flex-shrink-0" />{t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section ref={reveal(0)} className="opacity-0 translate-y-8 transition-all duration-700 py-20 px-5">
        <div className="page-wrapper">
          <div className="eyebrow"><span>Browse by Category</span></div>
          <h2 className="section-title mb-3">Everything a Muslim household <em>needs</em></h2>
          <p className="text-muted text-sm font-light leading-relaxed max-w-md mb-10">
            From halal food to modest fashion, Islamic books to Sunnah remedies.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map(cat => (
              <Link key={cat.slug} to={`/category/${cat.slug}`}
                className="card-hover p-5 sm:p-7 flex flex-col items-center text-center gap-2 group">
                <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
                <span className="text-sm font-semibold text-ink">{cat.name}</span>
                <span className="text-xs text-muted">{cat.count} sellers</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK FEATURES BLOCK ── */}
      <section ref={reveal(1)} className="opacity-0 translate-y-8 transition-all duration-700 px-4 sm:px-6 mb-16">
        <div className="max-w-6xl mx-auto bg-forest rounded-3xl p-8 sm:p-14 overflow-hidden relative">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden hidden lg:block">
            <span className="font-arabic text-[280px] text-white/[0.03] absolute -right-8 top-1/2 -translate-y-1/2 leading-none select-none">
              سوق
            </span>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="eyebrow"><span className="text-gold-light">Why SouqHalal</span></div>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight mb-4">
                Built on <em className="italic text-gold-light">trust,</em><br />rooted in faith
              </h2>
              <p className="text-white/50 text-sm leading-relaxed font-light max-w-sm">
                We built what the Muslim community deserved — a marketplace where every transaction reflects Islamic values.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map(f => (
                <div key={f.title}
                  className="bg-white/5 border border-white/8 rounded-2xl p-6 hover:bg-white/8 hover:border-gold/20 transition-all">
                  <div className="w-10 h-10 bg-gold/15 border border-gold/20 rounded-xl
                                  grid place-items-center mb-4">
                    <f.icon className="w-5 h-5 text-gold-light" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed font-light">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED SELLERS ── */}
      <section ref={reveal(2)} className="opacity-0 translate-y-8 transition-all duration-700 py-20 px-5">
        <div className="page-wrapper">
          <div className="eyebrow"><span>Featured Sellers</span></div>
          <h2 className="section-title mb-10">Trusted <em>Muslim businesses</em> near you</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {sellers.map(s => (
              <div key={s.name} className="card-hover overflow-hidden">
                <div className={`h-28 bg-gradient-to-br ${s.bg} relative flex items-center justify-center`}>
                  <span className="font-arabic text-5xl text-white/15 select-none">{s.ar}</span>
                  <div className="absolute top-3 right-3 bg-white/15 backdrop-blur-sm border
                                  border-white/25 text-white text-[10px] font-bold px-2.5 py-1
                                  rounded-full tracking-wider">✓ Verified</div>
                </div>
                <div className="p-5">
                  <p className="font-semibold text-sm text-ink mb-0.5">{s.name}</p>
                  <p className="text-xs text-muted mb-3">{s.cat} · {s.city}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-gold">{'★'.repeat(5)}</div>
                      <div className="text-xs text-muted">{s.reviews} reviews</div>
                    </div>
                    <span className="text-xs text-muted">📍 {s.city}</span>
                  </div>
                  <button className="mt-4 w-full py-2.5 rounded-xl bg-gold-pale border border-gold/20
                                     text-gold text-xs font-semibold hover:bg-gold hover:text-white
                                     transition-all">
                    View Store →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section ref={reveal(3)} className="opacity-0 translate-y-8 transition-all duration-700 py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-soft">
          <div className="p-8 sm:p-12 border-b border-gray-100">
            <div className="eyebrow"><span>How It Works</span></div>
            <h2 className="section-title">Up and running in <em>three steps</em></h2>
          </div>
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {[
              { n:'01', icon:'📝', t:'Register Your Business',  d:'Create your free seller profile in minutes — no credit card needed.' },
              { n:'02', icon:'📦', t:'List Your Products',      d:'Upload photos, set prices, add descriptions. Your store goes live instantly.' },
              { n:'03', icon:'💬', t:'Connect & Sell',          d:'Buyers find you and tap your WhatsApp button to close the deal directly.' },
            ].map(s => (
              <div key={s.n} className="p-8 sm:p-10 text-center">
                <div className="font-serif text-5xl font-bold text-mint mb-4">{s.n}</div>
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-semibold text-sm mb-2">{s.t}</h3>
                <p className="text-xs text-muted leading-relaxed font-light">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section ref={reveal(4)} id="pricing"
        className="opacity-0 translate-y-8 transition-all duration-700 py-20 px-5 text-center">
        <div className="page-wrapper">
          <div className="eyebrow justify-center"><span>Seller Plans</span></div>
          <h2 className="section-title mb-2">Simple, <em>honest</em> pricing</h2>
          <p className="text-muted text-sm mb-12">No hidden fees. No interest. Start free.</p>

          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto items-center">
            {plans.map(p => (
              <div key={p.tier}
                className={`rounded-2xl p-8 border relative transition-all ${
                  p.featured
                    ? 'bg-forest border-forest text-white scale-105 shadow-green'
                    : 'bg-white border-gray-100 shadow-soft hover:shadow-card'
                }`}>
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white
                                   text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                )}
                <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${p.featured ? 'text-gold-light' : 'text-emerald'}`}>
                  {p.tier}
                </p>
                <p className={`font-serif text-4xl font-bold mb-0.5 ${p.featured ? 'text-white' : 'text-ink'}`}>{p.price}</p>
                <p className={`text-xs mb-3 ${p.featured ? 'text-white/50' : 'text-muted'}`}>{p.per}</p>
                <p className={`text-xs leading-relaxed mb-6 pb-6 border-b ${
                  p.featured ? 'text-white/50 border-white/10' : 'text-muted border-gray-100'}`}>
                  {p.desc}
                </p>
                <ul className="space-y-2 mb-6 text-left">
                  {p.features.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-xs ${p.featured ? 'text-white/70' : 'text-ink-soft'}`}>
                      <span className={p.featured ? 'text-gold-light' : 'text-jade'}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link to="/auth/signup"
                  className={`block w-full py-3 rounded-xl text-xs font-bold text-center transition-all ${
                    p.featured
                      ? 'bg-gold hover:bg-gold-light text-white'
                      : 'border border-gray-200 hover:border-emerald hover:text-emerald hover:bg-mint text-ink-soft'
                  }`}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={reveal(5)}
        className="opacity-0 translate-y-8 transition-all duration-700 px-4 sm:px-6 pb-20">
        <div className="max-w-4xl mx-auto bg-gold-pale border border-gold/15 rounded-3xl
                        p-10 sm:p-16 text-center relative overflow-hidden">
          <span className="absolute inset-0 flex items-center justify-center font-arabic
                           text-[180px] text-gold/5 pointer-events-none select-none leading-none">
            ﷽
          </span>
          <div className="relative z-10">
            <div className="eyebrow justify-center"><span>Join the Ummah Marketplace</span></div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light leading-tight mb-4">
              Your halal business<br /><em className="italic text-emerald">deserves a home.</em>
            </h2>
            <p className="text-muted text-sm max-w-sm mx-auto mb-8 leading-relaxed font-light">
              Join thousands of Muslim entrepreneurs already connecting with conscious buyers across Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/auth/signup" className="btn btn-xl btn-primary">
                List Your Business Free
              </Link>
              <Link to="/browse" className="btn btn-xl btn-secondary">
                Browse the Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
