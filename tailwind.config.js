import defaultTheme from 'tailwindcss/defaultTheme'
import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': 'calc(1340px + 1rem * 2)',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Gordita', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [
    addVariablesForColors,
    // require('./tailwind-plugin.cjs')
  ],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))

  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))

  addBase({
    ':root': newVars,
  })
}
