export default function LandingPage() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
<div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
  {/* Animated Gradient Background, or remove this div if you only want black */}
  {/* ... rest of your content ... */}
</div>

      {/* Foreground Content */}
      <div className="relative z-10 px-8 py-12 text-center">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg text-white">
          Discover the World's Most Unique Finds
        </h1>
        <p className="text-lg text-white/80 mb-6">
          Shop, sell, and connect on WoWKTM — the next-gen marketplace.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/products" className="rounded-xl bg-white/90 px-6 py-3 font-semibold text-indigo-700 shadow hover:bg-white transition">
            Explore Products
          </a>
          <a href="/signup" className="rounded-xl bg-indigo-700 px-6 py-3 font-semibold text-white shadow hover:bg-indigo-800 transition">
            Become a Seller
          </a>
        </div>
      </div>
    </div>
  );
}
