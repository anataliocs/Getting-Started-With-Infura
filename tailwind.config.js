module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B4A',
        darkGray: '#212121',
        success: '#00FFA3',
      },
      screens: {
        tablet: '768px',
        desktop: '1440px',
        short: { raw: '(max-height: 720px)' },
      },
      fontSize: {
        xxs: ['0.625rem', { lineHeight: '1.125rem' }], // font-size: 12px, line-height: 18px
        xs: ['0.75rem', { lineHeight: '1.125rem' }], // font-size: 12px, line-height: 18px
        '2xl': ['1.5rem', { lineHeight: '1.5rem' }], // font-size: 24px, line-height: 24px
        '3xl': ['2rem', { lineHeight: '2rem' }], // font-size: 32px, line-height: 32px
        '4xl': ['2.5rem', { lineHeight: '2.5rem' }], // font-size: 40px, line-height: 40px
        '6xl': ['4rem', { lineHeight: '4rem' }], // font-size: 64px, line-height: 64px
      },
      spacing: {
        2.5: '0.625rem',
        4.5: '1.125rem',
        8.5: '2.125rem',
        26: '6.5rem',
        30: '7.5rem',
        74: '18.5rem',
        124: '31rem',
      },
      maxWidth: {
        '1.5xl': '39rem',
        '8xl': '90rem',
      },
      lineHeight: {
        3.5: '0.875rem', // line-height: 14px
      },
      gridColumn: {
        'span-none': 'none',
      },
      backgroundImage: {
        'dashed-border': `url(
          "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='white' stroke-opacity='1' stroke-width='2.5' stroke-dasharray='20%2c 10.5' stroke-dashoffset='16' stroke-linecap='square'/%3e%3c/svg%3e"
        )`,
        // eslint-disable-next-line
        'border-gradient-to-b': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23fff' stop-opacity='100%25'/%3E%3Cstop offset='100%25' stop-color='%23fff' stop-opacity='12%25'/%3E%3C/linearGradient%3E%3Crect width='100%25' height='100%25' rx='8' ry='8' fill='none' stroke='url(%23a)' stroke-width='1'/%3E%3C/svg%3E")`,
        // eslint-disable-next-line
        'border-gradient-to-t': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23fff' stop-opacity='10%25'/%3E%3Cstop offset='100%25' stop-color='%23fff' stop-opacity='40%25'/%3E%3C/linearGradient%3E%3Crect width='100%25' height='100%25' rx='8' ry='8' fill='none' stroke='url(%23a)' stroke-width='1'/%3E%3C/svg%3E")`,
        // eslint-disable-next-line
        'border-gradient-error-to-b': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23FF6B4A%0A' stop-opacity='100%25'/%3E%3Cstop offset='100%25' stop-color='%23FF6B4A%0A' stop-opacity='12%25'/%3E%3C/linearGradient%3E%3Crect width='100%25' height='100%25' rx='8' ry='8' fill='none' stroke='url(%23a)' stroke-width='4'/%3E%3C/svg%3E")`,
        // eslint-disable-next-line
        'border-gradient-error-to-t': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23FF6B4A%0A' stop-opacity='10%25'/%3E%3Cstop offset='100%25' stop-color='%23FF6B4A%0A' stop-opacity='40%25'/%3E%3C/linearGradient%3E%3Crect width='100%25' height='100%25' rx='8' ry='8' fill='none' stroke='url(%23a)' stroke-width='4'/%3E%3C/svg%3E")`,
      },
      boxShadow: {
        custom: '0px 26px 69px rgba(0, 0, 0, 0.46)',
      },
      keyframes: {
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeout: {
          '100%': { opacity: 0 },
          '0%': { opacity: 1 },
        },
      },
      animation: {
        fade: 'fade 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)',
        fadein: 'fade 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)',
        fadeinfast: 'fade 0.1s cubic-bezier(0.215, 0.61, 0.355, 1)',
        fadeout: 'fadeout .75s cubic-bezier(0.215, 0.61, 0.355, 1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
