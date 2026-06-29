/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1B1D1F',
        steel: '#2E3236',
        steelLight: '#3C4146',
        paper: '#F5F1EA',
        paperDark: '#EAE3D6',
        signal: '#FF5A1F',
        signalDark: '#E04A12',
        stock: '#2E7D5B',
        slate: '#6B7280'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backgroundImage: {
        'diagonal-stripes': 'repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 12px)'
      }
    }
  },
  plugins: []
};
