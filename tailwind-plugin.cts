import plugin from 'tailwindcss/plugin'

module.exports = plugin(function ({ addComponents, addUtilities, theme }) {
  addUtilities({
    '.flex-center': {
      display: 'flex',
      alignItems: 'center',
    },
    '.regular-10': {
      fontSize: '0.625rem' /* 10px */,
      lineHeight: '0.875rem' /* 14px */,
      fontWeight: '400',
    },
    '.medium-10': {
      fontSize: '0.625rem' /* 10px */,
      lineHeight: '0.875rem' /* 14px */,
      fontWeight: '500',
    },
    '.regular-11': {
      fontSize: '0.6875rem' /* 11px */,
      lineHeight: '0.9375rem' /* 15px */,
      fontWeight: '400',
    },
    '.medium-11': {
      fontSize: '0.6875rem' /* 11px */,
      lineHeight: '0.9375rem' /* 15px */,
      fontWeight: '500',
    },
    '.regular-12': {
      fontSize: theme('fontSize.xs') /* 12px */,
      lineHeight: '1rem' /* 16px */,
      fontWeight: '400',
    },
    '.medium-12': {
      fontSize: theme('fontSize.xs') /* 12px */,
      lineHeight: '1rem' /* 16px */,
      fontWeight: '500',
    },
    '.regular-14': {
      fontSize: theme('fontSize.sm') /* 14px */,
      lineHeight: '142.857%',
      fontWeight: '400',
    },
    '.medium-14': {
      fontSize: theme('fontSize.sm') /* 14px */,
      lineHeight: '142.857%',
      fontWeight: '500',
    },
    '.bold-14': {
      fontSize: theme('fontSize.sm') /* 14px */,
      lineHeight: '142.857%',
      fontWeight: '700',
    },
    '.regular-15': {
      fontSize: '0.9375rem' /* 15px */,
      lineHeight: '146.667%',
      fontWeight: '400',
    },
    '.medium-15': {
      fontSize: '0.9375rem' /* 15px */,
      lineHeight: '146.667%',
      fontWeight: '500',
    },
    '.bold-15': {
      fontSize: '0.9375rem' /* 15px */,
      lineHeight: '146.667%',
      fontWeight: '700',
    },
    '.regular-16': {
      fontSize: theme('fontSize.base') /* 16px */,
      lineHeight: '150%',
      fontWeight: '400',
    },
    '.medium-16': {
      fontSize: theme('fontSize.base') /* 16px */,
      lineHeight: '150%',
      fontWeight: '500',
    },
    '.bold-16': {
      fontSize: theme('fontSize.base') /* 16px */,
      lineHeight: '150%',
      fontWeight: '700',
    },
    '.regular-18': {
      fontSize: theme('fontSize.lg') /* 18px */,
      lineHeight: '144.444%',
      fontWeight: '400',
    },
    '.medium-18': {
      fontSize: theme('fontSize.lg') /* 18px */,
      lineHeight: '144.444%',
      fontWeight: '500',
    },
    '.bold-18': {
      fontSize: theme('fontSize.lg') /* 18px */,
      lineHeight: '144.444%',
      fontWeight: '700',
    },
    '.regular-22': {
      fontSize: '1.375rem' /* 22px */,
      lineHeight: '145.455%',
      fontWeight: '400',
    },
    '.medium-22': {
      fontSize: '1.375rem' /* 22px */,
      lineHeight: '145.455%',
      fontWeight: '500',
    },
    '.bold-22': {
      fontSize: '1.375rem' /* 22px */,
      lineHeight: '145.455%',
      fontWeight: '700',
    },
    '.medium-24': {
      fontSize: theme('fontSize.2xl') /* 24px */,
      lineHeight: '141.667%',
      fontWeight: '500',
    },
    '.bold-24': {
      fontSize: theme('fontSize.2xl') /* 24px */,
      lineHeight: '141.667%',
      fontWeight: '700',
    },
    '.medium-26': {
      fontSize: '1.625rem' /* 26px */,
      lineHeight: '138.462%',
      fontWeight: '500',
    },
    '.bold-26': {
      fontSize: '1.625rem' /* 26px */,
      lineHeight: '138.462%',
      fontWeight: '700',
    },
    '.medium-30': {
      fontSize: theme('fontSize.3xl') /* 30px */,
      lineHeight: '146.667%',
      fontWeight: '500',
    },
    '.bold-30': {
      fontSize: theme('fontSize.3xl') /* 30px */,
      lineHeight: '146.667%',
      fontWeight: '700',
    },
    '.medium-36': {
      fontSize: theme('fontSize.4xl') /* 36px */,
      lineHeight: '138.889%',
      fontWeight: '500',
    },
    '.bold-36': {
      fontSize: theme('fontSize.4xl') /* 36px */,
      lineHeight: '138.889%',
      fontWeight: '700',
    },
    '.medium-42': {
      fontSize: '2.625rem' /* 42px */,
      lineHeight: '142.857%',
      fontWeight: '500',
    },
    '.bold-42': {
      fontSize: '2.625rem' /* 42px */,
      lineHeight: '142.857%',
      fontWeight: '700',
    },
  })

  addComponents({
    '.container': {
      maxWidth: '100%',
      '@screen sm': {
        maxWidth: 'calc(510px + var(--container-gutter))',
      },
      '@screen md': {
        maxWidth: 'calc(690px + var(--container-gutter))',
      },
      '@screen lg': {
        maxWidth: 'calc(930px + var(--container-gutter))',
      },
      '@screen xl': {
        maxWidth: 'calc(1110px + var(--container-gutter))',
      },
      '@screen 2xl': {
        maxWidth: 'calc(1340px + var(--container-gutter))',
      },
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: 'calc(var(--container-gutter) * 0.5)',
      paddingRight: 'calc(var(--container-gutter) * 0.5)',
    },
  })
})
