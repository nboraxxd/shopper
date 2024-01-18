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
      colors: {
        primary: {
          red: '#F94545',
          green: '#67B044',
          blue: '#0071DC',
          purple: '#7644E1',
          yellow: '#FFB700',
        },
        secondary: {
          DEFAULT: '#77DAE6',
          1: '#1A162E',
          2: '#9E9DA8',
          3: '#D2D1D6',
          4: '#EDEDF6',
          5: '#F8F8FB',
          6: '#FAFAFD ',
        },
        light: {
          1: '#FFFFFF',
          2: '#F6F6F6',
          3: '#EEEEEE',
        },
        dark: {
          1: '#171C28',
          2: '#292E39',
          3: '#B9BABE',
        },
      },
      fontFamily: {
        sans: ['Gordita', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        1: '0px 20px 60px 10px rgba(237, 237, 246, 0.20)',
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
