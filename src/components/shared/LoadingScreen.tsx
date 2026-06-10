export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4">
      <div className="text-4xl animate-pulse">🕌</div>
      <div className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
      <p className="font-arabic text-gold text-lg">سوق حلال</p>
    </div>
  )
}
