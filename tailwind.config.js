/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {},
  		transitionDuration: {
  			'3000': '3000ms'
  		},
  		keyframes: {
  			shine: {
  				'0%': {
  					'background-position': '100%'
  				},
  				'100%': {
  					'background-position': '-100%'
  				}
  			},
  			'shiny-text': {
  				'0%, 90%, 100%': {
  					'background-position': 'calc(-100% - var(--shiny-width)) 0'
  				},
  				'30%, 60%': {
  					'background-position': 'calc(100% + var(--shiny-width)) 0'
  				}
  			}
  		},
  		animation: {
  			shine: 'shine 5s linear infinite',
  			'shiny-text': 'shiny-text 8s infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}