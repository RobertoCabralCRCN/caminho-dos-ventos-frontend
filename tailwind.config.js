/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'umbanda-gold': '#D4AF37',
        'umbanda-purple': '#6B46C1',
        'umbanda-blue': '#1E40AF',
        'umbanda-green': '#059669',
        'umbanda-pink': '#EC4899',
        'umbanda-orange': '#EA580C',
        // New brand colors (Iansã & Ogum Beira Mar references)
        'iansa-yellow': '#FFF4B1',
        'ogum-red': '#DC2626',
        'ogum-blue-light': '#93C5FD',
        'ogum-blue': '#2563EB',
      },
      fontFamily: {
        'umbanda': ['Dancing Script', 'cursive'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
