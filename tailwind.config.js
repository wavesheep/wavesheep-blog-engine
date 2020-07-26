/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Helvetica Neue"',
          'Arial',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          'STHeiti',
          '"Microsoft YaHei"',
          '"Microsoft JhengHei"',
          '"Source Han Sans SC"',
          '"Noto Sans CJK SC"',
          '"Source Han Sans CN"',
          '"Noto Sans SC"',
          '"Source Han Sans TC"',
          '"Noto Sans CJK TC"',
          '"WenQuanYi Micro Hei"',
          'SimSun',
          'sans-serif'
        ]
      },
      spacing: {
        '96': '24rem'
      },
      colors: {
        black: {
          100: 'rgba(0,0,0,.1)',
          200: 'rgba(0,0,0,.2)',
          300: 'rgba(0,0,0,.3)',
          400: 'rgba(0,0,0,.4)',
          500: 'rgba(0,0,0,.5)',
          600: 'rgba(0,0,0,.6)',
          700: 'rgba(0,0,0,.7)',
          800: 'rgba(0,0,0,.8)',
          900: 'rgba(0,0,0,.9)',
          full: 'rgb(0,0,0)',
        },
        white: {
          100: 'rgba(255,255,255,.1)',
          200: 'rgba(255,255,255,.2)',
          300: 'rgba(255,255,255,.3)',
          400: 'rgba(255,255,255,.4)',
          500: 'rgba(255,255,255,.5)',
          600: 'rgba(255,255,255,.6)',
          700: 'rgba(255,255,255,.7)',
          800: 'rgba(255,255,255,.8)',
          900: 'rgba(255,255,255,.9)',
          full: 'rgb(255,255,255)',
        },
        cus: {
          black: '#404040',
          blue: '#1395ba',
          'darker-blue': '#0085a1',
          gray: '#777777',
          'light-gray': '#808080',
          'darker-gray': '#a3a3a3',
          'dark-gray': '#bfbfbf'
        }
      },
      fill: theme => ({
        'cus-black': theme('colors.cus.black'),
        'cus-blue': theme('colors.cus.blue'),
        black: {
          ...theme('colors.black')
        },
        white: {
          ...theme('colors.white')
        }
      }),
      boxShadow: {
        hyperlinkNormal: 'inset 0 -7px 0 0 rgba(19,149,186,.15)',
        hyperlinkHover: 'inset 0 -40px 0 0 rgba(19,149,186,.15)',
        box: 'rgba(0,0,0,.117647) 0 1px 6px, rgba(0,0,0,.239216) 0 1px 4px'
      },
      transitionTimingFunction: {
        hyperlink: 'cubic-bezier(0.895,.03,.685,.22)'
      }
    }
  },
  variants: {
    fill: ['group-hover']
  },
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.ts',
      'nuxt.config.js'
    ]
  }
}
