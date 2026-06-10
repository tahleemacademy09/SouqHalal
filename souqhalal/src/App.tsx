import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'

// Layouts
import PublicLayout    from '@/components/layout/PublicLayout'
import BuyerLayout     from '@/components/layout/BuyerLayout'
import SellerLayout    from '@/components/layout/SellerLayout'
import AdminLayout     from '@/components/layout/AdminLayout'

// Public pages
import LandingPage     from '@/pages/LandingPage'
import BrowsePage      from '@/pages/BrowsePage'
import CategoryPage    from '@/pages/CategoryPage'
import ProductPage     from '@/pages/ProductPage'
import StorePage       from '@/pages/StorePage'

// Auth pages
import LoginPage       from '@/pages/auth/LoginPage'
import SignupPage      from '@/pages/auth/SignupPage'
import ForgotPassword  from '@/pages/auth/ForgotPassword'
import ResetPassword   from '@/pages/auth/ResetPassword'

// Buyer pages
import BuyerDashboard  from '@/pages/buyer/BuyerDashboard'
import BuyerOrders     from '@/pages/buyer/BuyerOrders'
import BuyerOrderDetail from '@/pages/buyer/BuyerOrderDetail'
import BuyerWishlist   from '@/pages/buyer/BuyerWishlist'
import BuyerMessages   from '@/pages/buyer/BuyerMessages'
import BuyerSettings   from '@/pages/buyer/BuyerSettings'
import CartPage        from '@/pages/buyer/CartPage'
import CheckoutPage    from '@/pages/buyer/CheckoutPage'

// Seller pages
import SellerDashboard    from '@/pages/seller/SellerDashboard'
import SellerProducts     from '@/pages/seller/SellerProducts'
import SellerProductNew   from '@/pages/seller/SellerProductNew'
import SellerProductEdit  from '@/pages/seller/SellerProductEdit'
import SellerOrders       from '@/pages/seller/SellerOrders'
import SellerAnalytics    from '@/pages/seller/SellerAnalytics'
import SellerMessages     from '@/pages/seller/SellerMessages'
import SellerReviews      from '@/pages/seller/SellerReviews'
import SellerSettings     from '@/pages/seller/SellerSettings'
import SellerBilling      from '@/pages/seller/SellerBilling'
import SellerVerification from '@/pages/seller/SellerVerification'
import SellerOnboarding   from '@/pages/seller/SellerOnboarding'

// Admin pages
import AdminDashboard    from '@/pages/admin/AdminDashboard'
import AdminSellers      from '@/pages/admin/AdminSellers'
import AdminProducts     from '@/pages/admin/AdminProducts'
import AdminOrders       from '@/pages/admin/AdminOrders'
import AdminReports      from '@/pages/admin/AdminReports'
import AdminVerification from '@/pages/admin/AdminVerification'
import AdminCampaigns    from '@/pages/admin/AdminCampaigns'
import AdminSettings     from '@/pages/admin/AdminSettings'

import LoadingScreen from '@/components/shared/LoadingScreen'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
})

// ── Route Guards ──────────────────────────────────

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: 'buyer' | 'seller' | 'admin' }) {
  const { user, profile, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/auth/login" replace />
  if (role && profile?.role !== role) return <Navigate to="/" replace />
  return <>{children}</>
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (user) return <Navigate to="/" replace />
  return <>{children}</>
}

// ── App ───────────────────────────────────────────

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>

              {/* ── Public ── */}
              <Route element={<PublicLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="browse" element={<BrowsePage />} />
                <Route path="category/:slug" element={<CategoryPage />} />
                <Route path="product/:slug" element={<ProductPage />} />
                <Route path="store/:slug" element={<StorePage />} />
                <Route path="cart" element={<CartPage />} />
              </Route>

              {/* ── Auth ── */}
              <Route path="auth">
                <Route path="login"           element={<GuestRoute><LoginPage /></GuestRoute>} />
                <Route path="signup"          element={<GuestRoute><SignupPage /></GuestRoute>} />
                <Route path="forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
                <Route path="reset-password"  element={<ResetPassword />} />
              </Route>

              {/* ── Seller onboarding (before dashboard) ── */}
              <Route path="seller/onboarding" element={
                <ProtectedRoute><SellerOnboarding /></ProtectedRoute>
              } />

              {/* ── Buyer ── */}
              <Route path="buyer" element={
                <ProtectedRoute role="buyer"><BuyerLayout /></ProtectedRoute>
              }>
                <Route index element={<BuyerDashboard />} />
                <Route path="orders" element={<BuyerOrders />} />
                <Route path="orders/:id" element={<BuyerOrderDetail />} />
                <Route path="wishlist" element={<BuyerWishlist />} />
                <Route path="messages" element={<BuyerMessages />} />
                <Route path="settings" element={<BuyerSettings />} />
                <Route path="checkout" element={<CheckoutPage />} />
              </Route>

              {/* ── Seller ── */}
              <Route path="seller" element={
                <ProtectedRoute role="seller"><SellerLayout /></ProtectedRoute>
              }>
                <Route index element={<SellerDashboard />} />
                <Route path="products" element={<SellerProducts />} />
                <Route path="products/new" element={<SellerProductNew />} />
                <Route path="products/:id/edit" element={<SellerProductEdit />} />
                <Route path="orders" element={<SellerOrders />} />
                <Route path="analytics" element={<SellerAnalytics />} />
                <Route path="messages" element={<SellerMessages />} />
                <Route path="reviews" element={<SellerReviews />} />
                <Route path="settings" element={<SellerSettings />} />
                <Route path="billing" element={<SellerBilling />} />
                <Route path="verification" element={<SellerVerification />} />
              </Route>

              {/* ── Admin ── */}
              <Route path="admin" element={
                <ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="sellers" element={<AdminSellers />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="verification" element={<AdminVerification />} />
                <Route path="campaigns" element={<AdminCampaigns />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* ── 404 ── */}
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              style: { fontFamily: 'Outfit, sans-serif', fontSize: '14px' },
              success: { iconTheme: { primary: '#1a6b4a', secondary: '#fff' } },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
