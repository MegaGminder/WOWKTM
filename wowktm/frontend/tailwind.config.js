module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'wowktm-primary': '#4f46e5',
        'wowktm-secondary': '#10b981',
      },
      animation: {
        'gradient-move': 'gradientMove 15s ease infinite',
        'card-hover': 'cardHover 0.3s ease-in-out',
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