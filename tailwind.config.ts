import type { Config } from 'tailwindcss'

/**
 * Tokens read out of "Haus of pong landing page" (file Tge0IcB0cHdH96SE0l4Dm6)
 * with the Figma REST API. Sizes map to CSS vars declared in globals.css so
 * they stay proportional to the 1920px artboard at every viewport.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#050505',
          900: '#070707',
          800: '#101010',
          700: '#111111',
          600: '#161616',
          500: '#201f1f',
          400: '#211715',
        },
        ember: '#332001',
        orange: {
          DEFAULT: '#f7942b',
          400: '#fd991f',
          300: '#ff9d00',
          deep: '#663c00',
        },
        violet: {
          DEFAULT: '#8b3fff',
          400: '#a74ae5',
        },
        neon: '#6aff1f',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-manrope)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        title: ['var(--font-montserrat)', 'sans-serif'],
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        geist: ['var(--font-geist-sans)', 'sans-serif'],
      },
      fontSize: {
        f10: 'var(--fs-10)',
        f12: 'var(--fs-12)',
        f14: 'var(--fs-14)',
        f16: 'var(--fs-16)',
        f18: 'var(--fs-18)',
        f20: 'var(--fs-20)',
        f24: 'var(--fs-24)',
        f30: 'var(--fs-30)',
        f32: 'var(--fs-32)',
        f48: 'var(--fs-48)',
        f64: 'var(--fs-64)',
      },
      spacing: {
        s8: 'var(--sp-8)',
        s10: 'var(--sp-10)',
        s12: 'var(--sp-12)',
        s16: 'var(--sp-16)',
        s20: 'var(--sp-20)',
        s22: 'var(--sp-22)',
        s24: 'var(--sp-24)',
        s30: 'var(--sp-30)',
        s32: 'var(--sp-32)',
        s40: 'var(--sp-40)',
        s50: 'var(--sp-50)',
        s60: 'var(--sp-60)',
        s64: 'var(--sp-64)',
        s91: 'var(--sp-91)',
        s140: 'var(--sp-140)',
        s250: 'var(--sp-250)',
        s150: 'var(--sp-150)',
        s169: 'var(--sp-169)',
        header: 'var(--header-h)',
        logo: 'var(--logo)',
        chip48: 'var(--chip-48)',
        chip80: 'var(--chip-80)',
        chip108: 'var(--chip-108)',
        ring120: 'var(--ring-120)',
      },
      borderRadius: {
        r12: 'var(--r-12)',
        r24: 'var(--r-24)',
        r32: 'var(--r-32)',
        r48: 'var(--r-48)',
        pill: '999px',
      },
      backgroundImage: {
        // CTA pill — LINEAR 90deg #a74ae5 -> #fd991f. Kept as the one signature
        // gradient moment on the site — every other surface below went flat/black
        // per client direction ("less gradient, keep most backgrounds black").
        cta: 'linear-gradient(90deg, #a74ae5 0%, #fd991f 100%)',
        // Icon chips — LINEAR 129deg #a74ae5 -> #ff9d00 (kept: small accent badges, not surfaces)
        chip: 'linear-gradient(129deg, #a74ae5 0%, #ff9d00 100%)',
        // Step cards — flattened from a purple/orange wash to match the other card
        // treatments (About, Experiences) for one consistent black-card style.
        step: 'linear-gradient(180deg, #141414 0%, #101010 100%)',
        // Section washes — flattened to near-black; a whisper of warmth remains at
        // the transition edge instead of a visible amber bleed across the section.
        'wash-about': 'linear-gradient(180deg, #0a0a0a 0%, #120c04 100%)',
        'wash-dim': 'linear-gradient(180deg, #0a0a0a 0%, #0c0a05 100%)',
        'wash-up': 'linear-gradient(180deg, #120c04 0%, #070707 100%)',
        'wash-footer': 'linear-gradient(90deg, #050505 0%, #0f0a03 100%)',
        // Inner pages — RADIAL 135deg #080806 -> #311e01
        'wash-diag': 'linear-gradient(135deg, #080806 0%, #311e01 100%)',
        // Card / panel washes
        'exp-bloom': 'radial-gradient(circle at 50% 0%, rgba(255,106,31,0.13) 0%, rgba(255,106,31,0) 60%)',
        // VIP panels — flattened to the same black-card style as everything else.
        'vip-panel': 'linear-gradient(180deg, #141414 0%, #101010 100%)',
      },
      keyframes: {
        'scroll-dot': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(22px)', opacity: '0' },
        },
      },
      animation: {
        'scroll-dot': 'scroll-dot 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
