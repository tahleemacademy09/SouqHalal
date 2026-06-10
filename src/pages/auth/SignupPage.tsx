import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, ShoppingBag, Store } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/utils/helpers'
import toast from 'react-hot-toast'

const schema = z.object({
  full_name: z.string().min(2, 'Enter your full name'),
  email:     z.string().email('Enter a valid email'),
  password:  z.string().min(8, 'Password must be at least 8 characters'),
  role:      z.enum(['buyer', 'seller']),
})
type FormData = z.infer<typeof schema>

export default function SignupPage() {
  const navigate = useNavigate()
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'buyer' },
  })

  const selectedRole = watch('role')

  async function onSubmit(data: FormData) {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.full_name, role: data.role },
      },
    })
    if (error) {
      toast.error(error.message)
      setLoading(false)
      return
    }
    toast.success('Account created! Please check your email to verify.')
    if (data.role === 'seller') navigate('/seller/onboarding')
    else navigate('/')
  }

  return (
    <div className="min-h-screen bg-cream bg-pattern flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <span className="text-2xl">🕌</span>
          <span className="font-serif text-xl font-bold text-forest">SouqHalal</span>
        </Link>

        <h1 className="font-serif text-3xl font-normal mb-1">Create your account</h1>
        <p className="text-muted text-sm mb-8">
          Already have one?{' '}
          <Link to="/auth/login" className="text-emerald font-medium hover:underline">Sign in</Link>
        </p>

        {/* Role selector */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {(['buyer', 'seller'] as const).map(role => (
            <button key={role} type="button" onClick={() => setValue('role', role)}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all',
                selectedRole === role
                  ? 'border-forest bg-mint/50 text-forest'
                  : 'border-gray-200 text-muted hover:border-gray-300'
              )}>
              {role === 'buyer'
                ? <ShoppingBag className="w-6 h-6" />
                : <Store className="w-6 h-6" />}
              <span className="text-sm font-semibold capitalize">{role}</span>
              <span className="text-xs text-center leading-tight">
                {role === 'buyer' ? 'Shop halal products' : 'Sell your products'}
              </span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input {...register('full_name')} placeholder="Fatimah Abdullah"
              className={`input ${errors.full_name ? 'input-error' : ''}`} />
            {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
          </div>

          <div>
            <label className="label">Email address</label>
            <input {...register('email')} type="email" placeholder="you@example.com"
              className={`input ${errors.email ? 'input-error' : ''}`} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="label">Password</label>
            <div className="relative">
              <input {...register('password')} type={showPw ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                className={`input pr-10 ${errors.password ? 'input-error' : ''}`} />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <p className="text-xs text-muted leading-relaxed">
            By signing up you agree to our{' '}
            <Link to="/terms" className="text-emerald hover:underline">Terms of Service</Link> and{' '}
            <Link to="/privacy" className="text-emerald hover:underline">Privacy Policy</Link>.
          </p>

          <button type="submit" disabled={loading} className="btn btn-lg btn-primary w-full">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}
