/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        rushkey: {
          50: '#FFF0E6', 100: '#FFD1B3', 200: '#FFB280', 300: '#FF934D',
          400: '#FF7333', 500: '#FF5A00', 600: '#E04A00', 700: '#C13A00',
          800: '#A22A00', 900: '#831A00',
        },
        whatsapp: {
          50: '#E8F5E9', 100: '#C8E6C9', 500: '#25D366', 600: '#1DA851',
        },
        surface: {
          50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0',
          300: '#CBD5E1', 400: '#94A3B8', 500: '#64748B',
          600: '#475569', 700: '#334155', 800: '#1E293B', 900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.04)',
        'glass-lg': '0 8px 40px rgba(0, 0, 0, 0.06)',
        'card': '0 2px 20px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 30px rgba(255, 90, 0, 0.25)',
        'glow-sm': '0 0 16px rgba(255, 90, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
