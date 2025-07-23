import AnimatedBackground from "./AnimatedBackground";
import { motion } from "framer-motion";

export default function ParallaxHero() {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center overflow-hidden">
      <AnimatedBackground />
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-primary via-pink-400 to-secondary text-transparent bg-clip-text drop-shadow-2xl mb-6"
      >
        Discover the World's Most Unique Finds
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="text-lg md:text-2xl text-white/80 max-w-xl mx-auto mb-8"
      >
        Shop, sell, connect, and express yourself with WoWKTM — the next-gen marketplace.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <a href="#featured-products" className="px-8 py-3 rounded-2xl font-bold bg-white text-primary shadow-lg hover:bg-primary hover:text-white transition text-lg">Explore</a>
        <a href="/register" className="px-8 py-3 rounded-2xl font-bold bg-secondary text-white shadow-lg hover:bg-white hover:text-secondary transition text-lg">Become a Seller</a>
      </motion.div>
    </section>
  );
}
