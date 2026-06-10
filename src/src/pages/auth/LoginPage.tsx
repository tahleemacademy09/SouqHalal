import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

const schema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const navigate  = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }
    toast.success('Welcome back!')
    navigate('/')
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` },
    })
  }

  return (
    <div className="min-h-screen bg-cream bg-pattern flex">
      {/* Left panel - desktop */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-forest text-white p-12">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl grid place-items-center text-xl">🕌</div>
          <div>
            <div className="font-serif text-xl font-bold text-gold-light">SouqHalal</div>
            <div className="font-arabic text-sm text-gold/80">سوق حلال</div>
          </div>
        </Link>
        <div>
          <div className="font-arabic text-5xl text-gold/30 mb-6">﷽</div>
          <h2 className="font-serif text-4xl font-light leading-tight mb-4">
            Welcome back to<br /><em className="italic text-gold-light">the halal marketplace</em>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Connect with thousands of Muslim buyers and sellers across Nigeria.
          </p>
        </div>
        <p className="text-white/25 text-xs">© {new Date().getFullYear()} SouqHalal</p>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <span className="text-2xl">🕌</span>
            <span className="font-serif text-xl font-bold text-forest">SouqHalal</span>
          </Link>

          <h1 className="font-serif text-3xl font-normal mb-1">Sign in</h1>
          <p className="text-muted text-sm mb-8">
            Don't have an account?{' '}
            <Link to="/auth/signup" className="text-emerald font-medium hover:underline">Sign up free</Link>
          </p>

          {/* Google */}
          <button onClick={signInWithGoogle}
            className="btn btn-md btn-secondary w-full mb-4 gap-3">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="" className="w-4 h-4" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-muted">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">Email address</label>
              <input {...register('email')} type="email" placeholder="you@example.com"
                className={`input ${errors.email ? 'input-error' : ''}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="label mb-0">Password</label>
                <Link to="/auth/forgot-password" className="text-xs text-emerald hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input {...register('password')} type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`input pr-10 ${errors.password ? 'input-error' : ''}`} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="btn btn-lg btn-primary w-full">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
