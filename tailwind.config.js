/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Mono"', '"IBM Plex Mono"', 'monospace'],
        display: ['"DM Mono"', 'monospace'],
      },
      colors: {
        ink: '#0a0a0a',
        paper: '#f8f7f4',
        'dark-blue': '#1a3a5c',
        'dark-green': '#1a4a2e',
        'accent-blue': '#1e4d8c',
        'accent-green': '#1f5c38',
        'muted': '#888',
        'border': '#d4d0c8',
      },
    },
  },
  plugins: [],
}
