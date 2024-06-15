import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
          green: '#00F375',
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
          DEFAULT: '#000000',
          1: '#171C28',
          2: '#292E39',
          3: '#B9BABE',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        breadcrumb: {
          DEFAULT: 'hsl(var(--breadcrumb))',
          foreground: 'hsl(var(--breadcrumb-foreground))',
          last: 'hsl(var(--breadcrumb-last))',
        },
        'active-category': 'hsl(var(--active-category))',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        // Reference: https://github.com/tailwindlabs/tailwindcss/issues/11529
        /** 10px size / 0.875rem height / regular */
        'regular-10': ['0.625rem', { lineHeight: '0.875rem', fontWeight: '400' }],
        /** 10px size / 0.875rem height / medium */
        'medium-10': ['0.625rem', { lineHeight: '0.875rem', fontWeight: '500' }],

        /** 11px size / 0.9375rem height / regular */
        'regular-11': ['0.6875rem', { lineHeight: '0.9375rem', fontWeight: '400' }],
        /** 11px size / 0.9375rem height / medium */
        'medium-11': ['0.6875rem', { lineHeight: '0.9375rem', fontWeight: '500' }],

        /** 12px size / 1rem height / regular */
        'regular-12': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        /** 12px size / 1rem height / medium */
        'medium-12': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],

        /** 14px size / 142.857% height / regular */
        'regular-14': ['0.875rem', { lineHeight: '142.857%', fontWeight: '400' }],
        /** 14px size / 142.857% height / medium */
        'medium-14': ['0.875rem', { lineHeight: '142.857%', fontWeight: '500' }],
        /** 14px size / 142.857% height / bold */
        'bold-14': ['0.875rem', { lineHeight: '142.857%', fontWeight: '700' }],

        /** 15px size / 146.667% height / regular */
        'regular-15': ['0.9375rem', { lineHeight: '146.667%', fontWeight: '400' }],
        /** 15px size / 146.667% height / medium */
        'medium-15': ['0.9375rem', { lineHeight: '146.667%', fontWeight: '500' }],
        /** 15px size / 146.667% height / bold */
        'bold-15': ['0.9375rem', { lineHeight: '146.667%', fontWeight: '700' }],

        /** 16px size / 150% height / regular */
        'regular-16': ['1rem', { lineHeight: '150%', fontWeight: '400' }],
        /** 16px size / 150% height / medium */
        'medium-16': ['1rem', { lineHeight: '150%', fontWeight: '500' }],
        /** 16px size / 150% height / bold */
        'bold-16': ['1rem', { lineHeight: '150%', fontWeight: '700' }],

        /** 18px size / 144.444% height / regular */
        'regular-18': ['1.125rem', { lineHeight: '144.444%', fontWeight: '400' }],
        /** 18px size / 144.444% height / medium */
        'medium-18': ['1.125rem', { lineHeight: '144.444%', fontWeight: '500' }],
        /** 18px size / 144.444% height / bold */
        'bold-18': ['1.125rem', { lineHeight: '144.444%', fontWeight: '700' }],

        /** 22px size / 145.455% height / regular */
        'regular-22': ['1.375rem', { lineHeight: '145.455%', fontWeight: '400' }],
        /** 22px size / 145.455% height / medium */
        'medium-22': ['1.375rem', { lineHeight: '145.455%', fontWeight: '500' }],
        /** 22px size / 145.455% height / bold */
        'bold-22': ['1.375rem', { lineHeight: '145.455%', fontWeight: '700' }],

        /** 24px size / 141.667% height / medium */
        'medium-24': ['1.5rem', { lineHeight: '141.667%', fontWeight: '500' }],
        /** 24px size / 141.667% height / bold */
        'bold-24': ['1.5rem', { lineHeight: '141.667%', fontWeight: '700' }],

        /** 26px size / 138.462% height / medium */
        'medium-26': ['1.625rem', { lineHeight: '138.462%', fontWeight: '500' }],
        /** 26px size / 138.462% height / bold */
        'bold-26': ['1.625rem', { lineHeight: '138.462%', fontWeight: '700' }],

        /** 30px size / 146.667% height / medium */
        'medium-30': ['1.875rem', { lineHeight: '146.667%', fontWeight: '500' }],
        /** 30px size / 146.667% height / bold */
        'bold-30': ['1.875rem', { lineHeight: '146.667%', fontWeight: '700' }],

        /** 36px size / 138.889% height / medium */
        'medium-36': ['2.25rem', { lineHeight: '138.889%', fontWeight: '500' }],
        /** 36px size / 138.889% height / bold */
        'bold-36': ['2.25rem', { lineHeight: '138.889%', fontWeight: '700' }],

        /** 42px size / 142.857% height / medium */
        'medium-42': ['2.625rem', { lineHeight: '142.857%', fontWeight: '500' }],
        /** 42px size / 142.857% height / bold */
        'bold-42': ['2.625rem', { lineHeight: '142.857%', fontWeight: '700' }],
      },
      boxShadow: {
        section: 'var(--section-shadow)',
        popover: 'var(--popover-shadow)',
      },
      screens: {
        xs: '480px',
        '2xl': '1400px',
      },
      spacing: {
        7.5: '1.875rem',
      },
      borderRadius: {
        xl: '0.625rem' /* 10px */,
        '3xl': '1.25rem' /* 20px */,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/aspect-ratio'),
    require('./tailwind-plugin.cts'),
  ],
} satisfies Config

export default config
