import React from 'react';
import { motion } from 'framer-motion';

const NepaliProcessAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Nepali Cultural Process Journey */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Himalayan Mountain Silhouette Background */}
        <motion.path
          d="M0 400 L100 350 L200 300 L300 250 L400 200 L500 150 L600 180 L700 220 L800 260 L900 300 L1000 340 L1100 380 L1200 400 L1200 800 L0 800 Z"
          fill="url(#mountainGradient)"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.3, pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />

        {/* Traditional Nepali Elements */}
        {/* Prayer Flags Path */}
        <motion.path
          d="M50 100 Q300 150 600 120 Q900 90 1150 140"
          stroke="url(#prayerFlagGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
        />

        {/* Process Steps Circle Path */}
        <motion.circle
          cx="200"
          cy="300"
          r="80"
          stroke="url(#nepaliGold)"
          strokeWidth="4"
          fill="rgba(255,215,0,0.1)"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 2, delay: 0.5, ease: "backOut" }}
        />

        {/* Step 1: Artisan in Nepal */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {/* Traditional Pottery Wheel */}
          <motion.circle
            cx="200"
            cy="300"
            r="25"
            fill="#8B4513"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 300px" }}
          />
          
          {/* Artisan Hands */}
          <motion.path
            d="M175 285 Q185 275 195 285 Q205 275 215 285"
            stroke="#D4A574"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            animate={{ 
              d: [
                "M175 285 Q185 275 195 285 Q205 275 215 285",
                "M175 290 Q185 280 195 290 Q205 280 215 290",
                "M175 285 Q185 275 195 285 Q205 275 215 285"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Traditional Nepali Text */}
          <motion.text
            x="200"
            y="350"
            textAnchor="middle"
            fill="#FFD700"
            fontSize="14"
            fontWeight="bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            स्थानीय कलाकार
          </motion.text>
          <motion.text
            x="200"
            y="365"
            textAnchor="middle"
            fill="#FFF"
            fontSize="12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            Local Artisan
          </motion.text>
        </motion.g>

        {/* Journey Path from Nepal to World */}
        <motion.path
          d="M280 300 Q400 250 600 280 Q800 320 1000 300"
          stroke="url(#journeyGradient)"
          strokeWidth="6"
          fill="none"
          strokeDasharray="20 10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 2, ease: "easeInOut" }}
        />

        {/* Animated Products Moving Along Path */}
        <motion.g
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 6, delay: 3, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: "path('M280 300 Q400 250 600 280 Q800 320 1000 300')" }}
        >
          {/* Traditional Nepali Product Icons */}
          <motion.circle cx="0" cy="0" r="8" fill="#FF6B35" />
          <motion.path
            d="M-6 -6 L6 -6 L6 6 L-6 6 Z"
            fill="#FFD700"
            stroke="#8B4513"
            strokeWidth="1"
          />
        </motion.g>

        {/* Step 2: Global Marketplace */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
        >
          <motion.circle
            cx="1000"
            cy="300"
            r="80"
            stroke="url(#globalGradient)"
            strokeWidth="4"
            fill="rgba(0,123,255,0.1)"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Globe Icon */}
          <motion.circle
            cx="1000"
            cy="300"
            r="30"
            fill="none"
            stroke="#00BFFF"
            strokeWidth="3"
          />
          
          {/* Globe Lines */}
          <motion.path
            d="M970 300 Q1000 280 1030 300 Q1000 320 970 300"
            stroke="#00BFFF"
            strokeWidth="2"
            fill="none"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "1000px 300px" }}
          />
          
          <motion.line
            x1="1000"
            y1="270"
            x2="1000"
            y2="330"
            stroke="#00BFFF"
            strokeWidth="2"
          />

          {/* Global Buyers Text */}
          <motion.text
            x="1000"
            y="385"
            textAnchor="middle"
            fill="#00BFFF"
            fontSize="14"
            fontWeight="bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 4 }}
          >
            विश्वव्यापी ग्राहक
          </motion.text>
          <motion.text
            x="1000"
            y="400"
            textAnchor="middle"
            fill="#FFF"
            fontSize="12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 4.2 }}
          >
            Global Buyers
          </motion.text>
        </motion.g>

        {/* Traditional Nepali Decorative Elements */}
        {/* Mandala Pattern */}
        <motion.g
          initial={{ opacity: 0, rotate: 0, scale: 0 }}
          animate={{ opacity: 0.3, rotate: 360, scale: 1 }}
          transition={{ duration: 4, delay: 1, ease: "easeOut" }}
        >
          <motion.circle
            cx="600"
            cy="150"
            r="40"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            strokeDasharray="5 5"
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "600px 150px" }}
          />
          <motion.circle
            cx="600"
            cy="150"
            r="25"
            fill="none"
            stroke="#FF6B35"
            strokeWidth="1"
            strokeDasharray="3 3"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "600px 150px" }}
          />
        </motion.g>

        {/* Floating Cultural Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: [0.5, 1, 0.5],
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 20, 0]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            {/* Traditional Nepali Symbols */}
            <motion.text
              x={100 + i * 180}
              y={500 + Math.sin(i) * 50}
              textAnchor="middle"
              fill="#FFD700"
              fontSize="24"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              {i % 3 === 0 ? '🕉️' : i % 3 === 1 ? '🪷' : '🎋'}
            </motion.text>
          </motion.g>
        ))}

        {/* Gradients Definition */}
        <defs>
          <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A5568" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#2D3748" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1A202C" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="prayerFlagGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="20%" stopColor="#FFD700" />
            <stop offset="40%" stopColor="#00BFFF" />
            <stop offset="60%" stopColor="#32CD32" />
            <stop offset="80%" stopColor="#FF69B4" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>

          <linearGradient id="nepaliGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>

          <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#00BFFF" />
            <stop offset="100%" stopColor="#32CD32" />
          </linearGradient>

          <linearGradient id="globalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00BFFF" />
            <stop offset="50%" stopColor="#1E90FF" />
            <stop offset="100%" stopColor="#0066CC" />
          </linearGradient>
        </defs>
      </svg>

      {/* Particle System for Cultural Ambiance */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FF6B35' : '#00BFFF',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Traditional Music Visualization */}
      <div className="absolute bottom-20 left-20">
        <motion.div className="flex space-x-2">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-orange-500 to-yellow-400"
              style={{ height: `${20 + Math.random() * 40}px` }}
              animate={{
                scaleY: [1, 2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        <motion.p
          className="text-xs text-yellow-300 mt-2 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          नेपाली संस्कृति | Nepali Culture
        </motion.p>
      </div>
    </div>
  );
};

export default NepaliProcessAnimation;
