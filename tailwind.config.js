/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
// const defaultTheme = require('tailwindcss/defaultTheme')
const { getColors } = require('theme-colors')
module.exports = {
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
      //   mono: ['DM Mono', ...defaultTheme.fontFamily.mono]
      // },
      colors: {
        primary: getColors('#00CD81')
      }
      // 00CD81
      // maxHeight: {
      //   '(screen-16)': 'calc(100vh - 4rem)'
      // },
      // inset: {
      //   16: '4rem'
      // },
      // transitionProperty: {
      //   padding: 'padding'
      // }
    },
    typography: theme => ({
      default: {
        css: {

          color: theme('colors.gray.300'),
          '[class~="lead"]': {
            color: theme('colors.gray.300')
          },
          a: {
            color: theme('colors.primary.500')
          },
          strong: {
            color: theme('colors.gray.100')
          },
          'ol > li::before': {
            color: theme('colors.gray.400')
          },
          'ul > li::before': {
            backgroundColor: theme('colors.gray.600')
          },
          hr: {
            borderColor: theme('colors.gray.700')
          },
          blockquote: {
            color: theme('colors.gray.400'),
            borderLeftColor: theme('colors.gray.700'),
            fontWeight: '400',
            fontStyle: 'normal',
            quotes: '"\\201C""\\201D""\\2018""\\2019"'
          },
          'blockquote p:first-of-type::before': {
            content: ''
          },
          'blockquote p:last-of-type::after': {
            content: ''
          },
          h1: {
            color: theme('colors.gray.100')
          },
          h2: {
            color: theme('colors.gray.100'),
            borderBottomColor: theme('colors.gray.800')
          },
          h3: {
            color: theme('colors.gray.100'),
            borderBottomColor: theme('colors.gray.800'),
            paddingBottom: theme('padding.2'),
            borderBottomWidth: '1px'
          },
          h4: {
            color: theme('colors.gray.100')
          },
          'figure figcaption': {
            color: theme('colors.gray.400')
          },
          code: {
            color: theme('colors.gray.100'),
            backgroundColor: theme('colors.gray.800'),
            borderWidth: 0
          },
          'a code': {
            color: theme('colors.primary.500')
          },
          thead: {
            color: theme('colors.gray.100'),
            borderBottomColor: theme('colors.gray.600')
          },
          'tbody tr': {
            borderBottomColor: theme('colors.gray.700')
          }
        }
      }
    })
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
