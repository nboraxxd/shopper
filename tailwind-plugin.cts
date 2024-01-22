import plugin from 'tailwindcss/plugin'

module.exports = plugin(function ({ addComponents, addUtilities, theme: _theme }) {
  addUtilities({
    '.flex-center': {
      display: 'flex',
      alignItems: 'center',
    },
  })

  addComponents({
    '.container': {
      maxWidth: '100%',
      '@screen sm': {
        maxWidth: 'calc(510px + var(--grid-gutter-x))',
      },
      '@screen md': {
        maxWidth: 'calc(690px + var(--grid-gutter-x))',
      },
      '@screen lg': {
        maxWidth: 'calc(930px + var(--grid-gutter-x))',
      },
      '@screen xl': {
        maxWidth: 'calc(1110px + var(--grid-gutter-x))',
      },
      '@screen 2xl': {
        maxWidth: 'calc(1340px + var(--grid-gutter-x))',
      },
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: 'calc(var(--grid-gutter-x) * 0.5)',
      paddingRight: 'calc(var(--grid-gutter-x) * 0.5)',
    },
  })
})
