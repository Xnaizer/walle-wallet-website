// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class", // Perbaiki tipe ini
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Blue Palette - Primary
        primary: {
          50: '#f9fcff',      // lightest blue
          100: '#f2f8fe',     
          200: '#e9f4fe',     
          300: '#d7ebfd',     // uranian_blue variations
          400: '#bbdefb',     // uranian_blue DEFAULT
          500: '#90caf9',     // light_sky_blue DEFAULT
          600: '#64b5f6',     // argentinian_blue DEFAULT  
          700: '#42a5f5',     // argentinian_blue variant
          800: '#2196f3',     // dodger_blue DEFAULT
          900: '#1e88e5',     // bleu_de_france DEFAULT
          950: '#1976d2',     // french_blue DEFAULT
        },
        
        // Deep Blue Palette - Secondary Blue
        blue: {
          50: '#cae0f9',      // cobalt_blue 900
          100: '#95c1f3',     // cobalt_blue 800
          200: '#5fa2ed',     // cobalt_blue 700
          300: '#2a82e7',     // cobalt_blue 600
          400: '#1565c0',     // green_blue DEFAULT
          500: '#1976d2',     // french_blue DEFAULT
          600: '#1e88e5',     // bleu_de_france DEFAULT
          700: '#00509d',     // polynesian_blue DEFAULT
          800: '#11296b',     // royal_blue_traditional DEFAULT
          900: '#0d47a1',     // cobalt_blue DEFAULT
          950: '#030815',     // darkest blue
        },

        // Yellow/Gold Palette - Secondary
        secondary: {
          50: '#fff8dd',      // mustard 900
          100: '#fff0bc',     // mustard 800
          200: '#ffe99a',     // mustard 700
          300: '#ffe278',     // mustard 600
          400: '#ffdb57',     // mustard DEFAULT
          500: '#ffcb05',     // jonquil DEFAULT
          600: '#d0a600',     // jonquil 400
          700: '#9c7d00',     // jonquil 300
          800: '#685300',     // jonquil 200
          900: '#342a00',     // jonquil 100
          950: '#1a1500',     // darkest yellow
        },

        // Neutral Palette
        neutral: {
          50: '#fbfbfb',      // anti-flash_white 900
          100: '#f8f8f8',     // anti-flash_white 800
          200: '#f4f4f4',     // anti-flash_white 700
          300: '#f1f1f1',     // anti-flash_white 600
          400: '#ededed',     // anti-flash_white DEFAULT
          500: '#bebebe',     // anti-flash_white 400
          600: '#8e8e8e',     // anti-flash_white 300
          700: '#5f5f5f',     // anti-flash_white 200
          800: '#2f2f2f',     // anti-flash_white 100
          900: '#171717',     // darkest
          950: '#0a0a0a',     // ultra dark
        },

        // Accent Colors for special effects
        accent: {
          50: '#e3f2fd',      // alice_blue DEFAULT
          100: '#bbdefb',     // uranian_blue DEFAULT
          200: '#90caf9',     // light_sky_blue DEFAULT
          300: '#64b5f6',     // argentinian_blue DEFAULT
          400: '#42a5f5',     // argentinian_blue variant
          500: '#2196f3',     // dodger_blue DEFAULT
          600: '#1e88e5',     // bleu_de_france DEFAULT
          700: '#1976d2',     // french_blue DEFAULT
          800: '#1565c0',     // green_blue DEFAULT
          900: '#0d47a1',     // cobalt_blue DEFAULT
          950: '#00509d',     // polynesian_blue DEFAULT
        },
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'body': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
        'heading': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'sans': ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 8rem)', { 
          lineHeight: '0.9', 
          letterSpacing: '-0.02em',
          fontWeight: '800' 
        }],
        'display': ['clamp(2.5rem, 6vw, 6rem)', { 
          lineHeight: '1.1', 
          letterSpacing: '-0.025em',
          fontWeight: '700' 
        }],
        'heading': ['clamp(1.5rem, 4vw, 4rem)', { 
          lineHeight: '1.2', 
          letterSpacing: '-0.02em',
          fontWeight: '600' 
        }],
      },
      borderRadius: {
        'lg': 'var(--radius)',
        'md': 'calc(var(--radius) - 2px)',
        'sm': 'calc(var(--radius) - 4px)',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      keyframes: {
        // Base keyframes
        "accordion-down": {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        "accordion-up": {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "card-hover": {
          "0%": {
            transform: "translateY(0) rotateX(0deg) rotateY(0deg)",
            boxShadow: "0 10px 30px rgba(33, 150, 243, 0.15)",
          },
          "100%": {
            transform: "translateY(-10px) rotateX(5deg) rotateY(3deg)",
            boxShadow: "0 20px 40px rgba(33, 150, 243, 0.3), 0 10px 20px rgba(255, 203, 5, 0.1)",
          },
        },
        // Custom keyframes
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-30px) translateX(15px)' },
          '66%': { transform: 'translateY(15px) translateX(-10px)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scalePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(33, 150, 243, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(33, 150, 243, 0.8)' },
        },
        glowBlue: {
          '0%': { boxShadow: '0 0 20px rgba(33, 150, 243, 0.4)' },
          '100%': { boxShadow: '0 0 50px rgba(30, 136, 229, 0.8)' },
        },
        glowYellow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 203, 5, 0.4)' },
          '100%': { boxShadow: '0 0 50px rgba(255, 219, 87, 0.8)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        magnetic: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(var(--x), var(--y))' },
        },
        parallaxSlow: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-50px) translateX(25px)' },
        },
        parallaxFast: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-80px) translateX(-40px) rotate(180deg)' },
        },
        walletFloat: {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px) rotateY(0deg)' 
          },
          '25%': { 
            transform: 'translateY(-15px) translateX(10px) rotateY(5deg)' 
          },
          '50%': { 
            transform: 'translateY(-25px) translateX(-5px) rotateY(-3deg)' 
          },
          '75%': { 
            transform: 'translateY(-10px) translateX(15px) rotateY(7deg)' 
          },
        },
        cardFlip: {
          '0%': { transform: 'perspective(1000px) rotateY(0deg)' },
          '50%': { transform: 'perspective(1000px) rotateY(180deg)' },
          '100%': { transform: 'perspective(1000px) rotateY(360deg)' },
        },
        paymentPulse: {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 20px rgba(33, 150, 243, 0.3)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 0 40px rgba(255, 203, 5, 0.6)'
          },
        },
        cryptoWave: {
          '0%, 100%': { 
            backgroundPosition: '0% 50%',
            transform: 'scale(1)'
          },
          '33%': { 
            backgroundPosition: '50% 25%',
            transform: 'scale(1.02)'
          },
          '66%': { 
            backgroundPosition: '100% 75%',
            transform: 'scale(0.98)'
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.8s forwards",
        "fade-down": "fade-down 0.8s forwards",
        "card-hover": "card-hover 0.3s forwards",
        "float": "float 4s ease-in-out infinite",
        
        // Basic animations
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.8s ease-out forwards',
        'slide-left': 'slideLeft 0.8s ease-out forwards',
        'slide-right': 'slideRight 0.8s ease-out forwards',
        
        // Advanced animations
        'bounce-gentle': 'bounceGentle 3s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'scale-pulse': 'scalePulse 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'text-shimmer': 'textShimmer 3s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'tilt': 'tilt 10s infinite linear',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-blue': 'glowBlue 2s ease-in-out infinite alternate',
        'glow-yellow': 'glowYellow 2s ease-in-out infinite alternate',
        'ripple': 'ripple 0.6s linear',
        'magnetic': 'magnetic 0.3s ease-out',
        'parallax-slow': 'parallaxSlow 20s ease-in-out infinite',
        'parallax-fast': 'parallaxFast 15s ease-in-out infinite',
        
        // Special Walle Wallet effects
        'wallet-float': 'walletFloat 8s ease-in-out infinite',
        'card-flip': 'cardFlip 1.2s ease-in-out',
        'payment-pulse': 'paymentPulse 1.5s ease-in-out infinite',
        'crypto-wave': 'cryptoWave 4s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-linear': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-diagonal': 'linear-gradient(45deg, var(--tw-gradient-stops))',
        'grid-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLCAwLCAwLCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')",
        
        // Walle Wallet specific gradients
        'walle-primary': `linear-gradient(135deg, #2196f3 0%, #1e88e5 25%, #42a5f5 50%, #90caf9 75%, #bbdefb 100%)`,
        'walle-secondary': `linear-gradient(135deg, #ffcb05 0%, #ffdb57 50%, #ffe278 100%)`,
        'walle-mesh': `
          radial-gradient(at 20% 30%, hsla(210,100%,56%,0.8) 0px, transparent 50%),
          radial-gradient(at 80% 20%, hsla(45,100%,51%,0.6) 0px, transparent 50%),
          radial-gradient(at 40% 70%, hsla(225,100%,67%,0.7) 0px, transparent 50%),
          radial-gradient(at 90% 80%, hsla(45,100%,70%,0.5) 0px, transparent 50%),
          radial-gradient(at 10% 90%, hsla(215,100%,50%,0.6) 0px, transparent 50%)
        `,
        'walle-aurora': `linear-gradient(45deg, #2196f3, #42a5f5, #90caf9, #ffcb05, #ffdb57, #1e88e5)`,
        'payment-flow': `linear-gradient(90deg, #2196f3, #ffcb05, #42a5f5, #ffdb57)`,
        'crypto-gradient': `conic-gradient(from 0deg, #2196f3, #42a5f5, #ffcb05, #1e88e5, #2196f3)`,
        'glass-blue': `linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(30, 136, 229, 0.05))`,
        'glass-yellow': `linear-gradient(135deg, rgba(255, 203, 5, 0.1), rgba(255, 219, 87, 0.05))`,
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(33, 150, 243, 0.5)',
        'glow-blue-lg': '0 0 40px rgba(33, 150, 243, 0.6)',
        'glow-blue-xl': '0 0 60px rgba(30, 136, 229, 0.7)',
        'glow-yellow': '0 0 20px rgba(255, 203, 5, 0.5)',
        'glow-yellow-lg': '0 0 40px rgba(255, 219, 87, 0.6)',
        'inner-glow-blue': 'inset 0 2px 4px 0 rgba(33, 150, 243, 0.1)',
        'inner-glow-yellow': 'inset 0 2px 4px 0 rgba(255, 203, 5, 0.1)',
        'glass-blue': '0 8px 32px rgba(33, 150, 243, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'glass-yellow': '0 8px 32px rgba(255, 203, 5, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'walle-card': '0 10px 50px rgba(33, 150, 243, 0.15), 0 5px 20px rgba(255, 203, 5, 0.1)',
        'payment-active': '0 0 30px rgba(33, 150, 243, 0.6), 0 0 60px rgba(255, 203, 5, 0.4)',
      },
      dropShadow: {
        'glow-blue': '0 0 20px rgba(33, 150, 243, 0.5)',
        'glow-yellow': '0 0 20px rgba(255, 203, 5, 0.5)',
        'walle-glow': '0 0 25px rgba(33, 150, 243, 0.6)',
      },
      transitionTimingFunction: {
        'bounce-custom': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ease-out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'walle-smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [
    function({ addUtilities, addComponents }: { addUtilities: any; addComponents: any }) {
      const newUtilities = {
        '.perspective-1000': { perspective: '1000px' },
        '.preserve-3d': { 'transform-style': 'preserve-3d' },
        '.backface-hidden': { 'backface-visibility': 'hidden' },
        '.text-balance': { 'text-wrap': 'balance' },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      }

      const newComponents = {
        '.walle-glass': {
          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(30, 136, 229, 0.05))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(33, 150, 243, 0.2)',
          borderRadius: '1.5rem',
        },
        '.walle-card': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(33, 150, 243, 0.15)',
          borderRadius: '1.5rem',
          boxShadow: '0 10px 50px rgba(33, 150, 243, 0.15), 0 5px 20px rgba(255, 203, 5, 0.1)',
        },
        '.payment-button': {
          background: 'linear-gradient(135deg, #2196f3, #42a5f5)',
          borderRadius: '9999px',
          padding: '1rem 2rem',
          fontWeight: '600',
          color: 'white',
          boxShadow: '0 10px 25px rgba(33, 150, 243, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px) scale(1.05)',
            boxShadow: '0 20px 40px rgba(33, 150, 243, 0.4)',
          },
        },
      }

      addUtilities(newUtilities)
      addComponents(newComponents)
    },
  ],
}

export default config