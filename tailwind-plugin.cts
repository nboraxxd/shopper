/* eslint-disable no-undef */
import plugin from 'tailwindcss/plugin'

module.exports = plugin(function ({ addComponents, theme }) {
  addComponents({
    '.container': {
      maxWidth: `calc(${theme('columns.8xl')} + (${theme('padding.4')} * 2))`,
      paddingLeft: theme('padding.4'),
      paddingRight: theme('padding.4'),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  })
})
