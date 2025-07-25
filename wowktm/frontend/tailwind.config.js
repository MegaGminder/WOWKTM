module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'wowktm-primary': '#6366f1', // Updated to a more modern indigo
        'wowktm-secondary': '#f59e0b', // Updated to a vibrant amber
        'wowktm-accent': '#ec4899', // Added pink accent
        'wowktm-dark': '#1f2937', // Added dark color
      },
      fontFamily: {
        'sans': ['Poppins', 'Inter', 'sans-serif'],
        'display': ['Space Grotesk', 'Poppins', 'sans-serif'], // For headings and logo
        'body': ['Inter', 'sans-serif'], // For body text
      },
      animation: {
        'gradient-move': 'gradientMove 15s ease infinite',
        'card-hover': 'cardHover 0.3s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        cardHover: {
          '0%': { transform: 'translateY(0) rotateX(0deg)' },
          '100%': { transform: 'translateY(-10px) rotateX(5deg)' },
        },
      },
    },
  },
  plugins: [],
};