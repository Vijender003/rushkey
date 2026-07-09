/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#FFF7ED', 100: '#FFEDD5', 200: '#FED7AA', 300: '#FDBA74',
          400: '#FB923C', 500: '#F97316', 600: '#EA580C', 700: '#C2410C',
          800: '#9A3412', 900: '#7C2D12',
        },
        rushkey: {
          50: '#FFF0E6', 100: '#FFD1B3', 200: '#FFB280', 300: '#FF934D',
          400: '#FF7333', 500: '#FF5A1F', 600: '#E04A10', 700: '#C13A00',
          800: '#A22A00', 900: '#831A00',
        },
        indigo: {
          50: '#EEF2FF', 100: '#E0E7FF', 200: '#C7D2FE', 300: '#A5B4FC',
          400: '#818CF8', 500: '#6366F1', 600: '#4F46E5', 700: '#4338CA',
          800: '#3730A3', 900: '#312E81',
        },
        charcoal: {
          50: '#F7F7F8', 100: '#EBEBED', 200: '#D4D4D8', 300: '#A1A1AA',
          400: '#71717A', 500: '#52525B', 600: '#3F3F46', 700: '#27272A',
          800: '#18181B', 900: '#09090B',
        },
        success: { 50: '#F0FDF4', 100: '#DCFCE7', 500: '#22C55E', 600: '#16A34A' },
        warning: { 50: '#FFFBEB', 100: '#FEF3C7', 500: '#F59E0B', 600: '#D97706' },
        error: { 50: '#FEF2F2', 100: '#FEE2E2', 500: '#EF4444', 600: '#DC2626' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.04)',
        'glass-lg': '0 8px 40px rgba(0, 0, 0, 0.06)',
        'card': '0 2px 20px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 30px rgba(99, 102, 241, 0.25)',
        'glow-sm': '0 0 16px rgba(99, 102, 241, 0.15)',
      },
    },
  },
  plugins: [],
};