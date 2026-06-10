// Auto-generated types from SouqHalal Supabase schema
// Keep in sync with your database schema

export type UserRole = 'buyer' | 'seller' | 'admin'
export type AccountStatus = 'active' | 'suspended' | 'pending_verification' | 'banned'
export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'
export type ListingStatus = 'draft' | 'active' | 'paused' | 'sold_out' | 'archived'
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
export type PaymentMethod = 'paystack' | 'bank_transfer' | 'whatsapp_negotiated'
export type PlanTier = 'free' | 'growth' | 'featured'
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'trial'
export type ReportReason = 'spam' | 'fake_product' | 'not_halal' | 'scam' | 'inappropriate' | 'other'
export type DeliveryMethod = 'pickup' | 'delivery' | 'both' | 'digital'
export type ProductCondition = 'new' | 'used_like_new' | 'used_good' | 'used_fair'
export type NotificationType =
  | 'order_placed' | 'order_confirmed' | 'order_shipped' | 'order_delivered'
  | 'order_cancelled' | 'new_review' | 'review_reply' | 'new_message'
  | 'subscription_expiring' | 'subscription_renewed' | 'verification_approved'
  | 'verification_rejected' | 'promotion_live' | 'wishlist_price_drop'
  | 'new_follower' | 'product_back_in_stock' | 'admin_alert'

// ── Row types ──────────────────────────────────────

export interface Profile {
  id: string
  full_name: string | null
  display_name: string | null
  avatar_url: string | null
  phone: string | null
  whatsapp_number: string | null
  bio: string | null
  role: UserRole
  account_status: AccountStatus
  city: string | null
  state: string | null
  country: string
  location_lat: number | null
  location_lng: number | null
  preferred_lang: string
  push_token: string | null
  email_verified: boolean
  phone_verified: boolean
  onboarding_done: boolean
  last_active_at: string | null
  created_at: string
  updated_at: string
}

export interface SellerProfile {
  id: string
  user_id: string
  business_name: string
  business_name_ar: string | null
  slug: string
  tagline: string | null
  description: string | null
  logo_url: string | null
  banner_url: string | null
  business_email: string | null
  business_phone: string | null
  whatsapp_number: string | null
  instagram_handle: string | null
  facebook_url: string | null
  website_url: string | null
  address_line1: string | null
  address_line2: string | null
  city: string | null
  state: string | null
  country: string
  location_lat: number | null
  location_lng: number | null
  plan_tier: PlanTier
  verification_status: VerificationStatus
  verification_notes: string | null
  verified_at: string | null
  halal_declaration: boolean
  halal_declaration_at: string | null
  halal_certificate_url: string | null
  total_sales: number
  total_revenue: number
  rating_avg: number
  rating_count: number
  follower_count: number
  is_featured: boolean
  featured_until: string | null
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  name_ar: string | null
  name_ha: string | null
  name_yo: string | null
  slug: string
  description: string | null
  icon_emoji: string | null
  image_url: string | null
  parent_id: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface Product {
  id: string
  seller_id: string
  category_id: string
  sub_category_id: string | null
  title: string
  title_ar: string | null
  slug: string
  description: string | null
  description_ar: string | null
  tags: string[] | null
  price: number
  compare_price: number | null
  currency: string
  price_negotiable: boolean
  sku: string | null
  quantity: number
  low_stock_alert: number
  track_quantity: boolean
  condition: ProductCondition
  delivery_method: DeliveryMethod
  delivery_days_min: number | null
  delivery_days_max: number | null
  delivery_note: string | null
  weight_kg: number | null
  is_digital: boolean
  digital_file_url: string | null
  is_halal_certified: boolean
  halal_cert_url: string | null
  halal_notes: string | null
  status: ListingStatus
  is_featured: boolean
  featured_until: string | null
  views_count: number
  wishlist_count: number
  orders_count: number
  rating_avg: number
  rating_count: number
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt_text: string | null
  sort_order: number
  is_primary: boolean
  created_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  variant_name: string
  variant_value: string
  price_delta: number
  quantity: number
  sku: string | null
  image_url: string | null
  is_active: boolean
  created_at: string
}

export interface Order {
  id: string
  order_number: string
  buyer_id: string
  seller_id: string
  status: OrderStatus
  payment_status: PaymentStatus
  subtotal: number
  delivery_fee: number
  discount_amount: number
  total_amount: number
  currency: string
  delivery_method: DeliveryMethod | null
  delivery_address: Record<string, string> | null
  delivery_note: string | null
  expected_by: string | null
  shipped_at: string | null
  delivered_at: string | null
  tracking_number: string | null
  buyer_note: string | null
  seller_note: string | null
  whatsapp_negotiated: boolean
  coupon_code: string | null
  coupon_id: string | null
  cancelled_at: string | null
  cancel_reason: string | null
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id: string | null
  quantity: number
  unit_price: number
  total_price: number
  product_snapshot: Record<string, unknown> | null
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  variant_id: string | null
  quantity: number
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  product_id: string
  seller_id: string
  buyer_id: string
  order_id: string | null
  rating: number
  title: string | null
  body: string | null
  is_verified_purchase: boolean
  is_approved: boolean
  helpful_count: number
  seller_reply: string | null
  seller_replied_at: string | null
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  title_ar: string | null
  message: string | null
  message_ar: string | null
  action_url: string | null
  image_url: string | null
  is_read: boolean
  read_at: string | null
  entity_type: string | null
  entity_id: string | null
  metadata: Record<string, unknown> | null
  created_at: string
}

export interface Conversation {
  id: string
  buyer_id: string
  seller_id: string
  product_id: string | null
  order_id: string | null
  last_message: string | null
  last_message_at: string | null
  buyer_unread: number
  seller_unread: number
  is_archived: boolean
  created_at: string
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  body: string | null
  image_url: string | null
  is_read: boolean
  read_at: string | null
  created_at: string
}

export interface Subscription {
  id: string
  seller_id: string
  plan_tier: PlanTier
  status: SubscriptionStatus
  amount_ngn: number
  paystack_sub_code: string | null
  paystack_plan_code: string | null
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  cancelled_at: string | null
  trial_end: string | null
  created_at: string
  updated_at: string
}

export interface Wishlist {
  id: string
  user_id: string
  product_id: string
  created_at: string
}

export interface Follow {
  id: string
  follower_id: string
  seller_id: string
  created_at: string
}

export interface Coupon {
  id: string
  seller_id: string | null
  campaign_id: string | null
  code: string
  discount_type: 'percentage' | 'fixed_amount' | 'free_shipping'
  discount_value: number
  min_order_amount: number
  max_discount_cap: number | null
  usage_limit: number | null
  usage_count: number
  per_user_limit: number
  valid_from: string
  valid_until: string | null
  is_active: boolean
  created_at: string
}

// ── Extended types with joins ──────────────────────

export interface ProductWithSeller extends Product {
  seller_profiles: Pick<SellerProfile, 'business_name' | 'slug' | 'verification_status' | 'city'>
  categories: Pick<Category, 'name' | 'slug' | 'icon_emoji'>
  product_images: ProductImage[]
}

export interface OrderWithItems extends Order {
  order_items: (OrderItem & { products: Pick<Product, 'title' | 'slug'>, product_images: ProductImage[] })[]
  profiles: Pick<Profile, 'full_name' | 'avatar_url'>
}

export interface CartItemWithProduct extends CartItem {
  products: Product & { product_images: ProductImage[] }
  product_variants: ProductVariant | null
}

// ── Database type for Supabase client ──────────────

export type Database = {
  public: {
    Tables: {
      profiles:             { Row: Profile;        Insert: Partial<Profile>;        Update: Partial<Profile> }
      seller_profiles:      { Row: SellerProfile;  Insert: Partial<SellerProfile>;  Update: Partial<SellerProfile> }
      categories:           { Row: Category;       Insert: Partial<Category>;       Update: Partial<Category> }
      products:             { Row: Product;        Insert: Partial<Product>;        Update: Partial<Product> }
      product_images:       { Row: ProductImage;   Insert: Partial<ProductImage>;   Update: Partial<ProductImage> }
      product_variants:     { Row: ProductVariant; Insert: Partial<ProductVariant>; Update: Partial<ProductVariant> }
      orders:               { Row: Order;          Insert: Partial<Order>;          Update: Partial<Order> }
      order_items:          { Row: OrderItem;      Insert: Partial<OrderItem>;      Update: Partial<OrderItem> }
      cart_items:           { Row: CartItem;       Insert: Partial<CartItem>;       Update: Partial<CartItem> }
      reviews:              { Row: Review;         Insert: Partial<Review>;         Update: Partial<Review> }
      notifications:        { Row: Notification;   Insert: Partial<Notification>;   Update: Partial<Notification> }
      conversations:        { Row: Conversation;   Insert: Partial<Conversation>;   Update: Partial<Conversation> }
      messages:             { Row: Message;        Insert: Partial<Message>;        Update: Partial<Message> }
      subscriptions:        { Row: Subscription;   Insert: Partial<Subscription>;   Update: Partial<Subscription> }
      wishlists:            { Row: Wishlist;       Insert: Partial<Wishlist>;       Update: Partial<Wishlist> }
      follows:              { Row: Follow;         Insert: Partial<Follow>;         Update: Partial<Follow> }
      coupons:              { Row: Coupon;         Insert: Partial<Coupon>;         Update: Partial<Coupon> }
    }
    Functions: {
      search_products:      { Args: Record<string, unknown>; Returns: unknown[] }
      get_seller_dashboard: { Args: { p_seller_id: string }; Returns: Record<string, unknown> }
    }
  }
}
