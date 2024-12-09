/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'node_modules/preline/dist/*.js',
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif'],
				inner: ['Inner', 'sans-serif'],
				nunito: ['Nunito', 'sans-serif'],
				nanum: ['Nanum Gothic', 'sans-serif'],
			},
			colors: {
				'brand-primary-light': '#4486cc',
				'brand-primary-inactive': '#6c81ba',
				'brand-primary': '#0034F0',
				'brand-primary-dark': '#000088',
				'brand-black': '#1A1A1A',
				'brand-black-dark': '#0D0D0D',
				'white': '#FFFFFF',
				'black': '#000000',
			},
			backdropBlur: { '10xl': '10rem' },
			keyframes: {
				'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
				'fade-out': { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('preline/plugin'),
	],
	experimental: { matchVariant: true, optimizeUniversalDefaults: true },
	darkMode: 'media',
};

