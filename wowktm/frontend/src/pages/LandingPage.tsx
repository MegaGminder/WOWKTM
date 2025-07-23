import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-wowktm-primary via-wowktm-secondary to-white animate-gradient-move">
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-white drop-shadow-lg"
        >
          Welcome to WoWKTM Marketplace
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg text-white mt-4"
        >
          Discover unique products crafted with love.
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link
            to="/products"
            className="mt-6 inline-block bg-white text-wowktm-primary px-6 py-3 rounded-xl font-semibold shadow hover:bg-wowktm-secondary hover:text-white transition"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;