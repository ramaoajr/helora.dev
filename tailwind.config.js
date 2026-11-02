/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				sans: [
					'"IBM Plex Sans"',
					'system-ui',
					'-apple-system',
					'"Segoe UI"',
					'Roboto',
					'Arial',
					'sans-serif',
				],
			},
			fontSize: {
				display: ['3.5rem', { lineHeight: '1.04', letterSpacing: '-0.022em', fontWeight: '700' }],
				'display-sm': ['2.25rem', { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '700' }],
				h2: ['2.5rem', { lineHeight: '1.14', letterSpacing: '-0.018em', fontWeight: '700' }],
				'h2-sm': ['1.75rem', { lineHeight: '1.22', letterSpacing: '-0.015em', fontWeight: '700' }],
				h3: ['1.375rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
				h4: ['1.125rem', { lineHeight: '1.35', letterSpacing: '-0.005em', fontWeight: '600' }],
				lead: ['1.25rem', { lineHeight: '1.6' }],
				'lead-sm': ['1.0625rem', { lineHeight: '1.6' }],
				body: ['1rem', { lineHeight: '1.65' }],
				small: ['0.875rem', { lineHeight: '1.6' }],
				micro: ['0.8125rem', { lineHeight: '1.55' }],
				eyebrow: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.16em', fontWeight: '600' }],
				stat: ['3rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }],
				'stat-sm': ['2.25rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }],
			},
			colors: {
				brand: {
					blue: '#0B1F33',
					blueSoft: '#102F4F',
					blueMuted: '#163B5C',
					yellow: '#F4B400',
					deep: '#071726',
				},
				copy: {
					DEFAULT: '#C7D6E6',
					muted: '#9FB4C9',
					strong: '#FFFFFF',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			boxShadow: {
				card: '0 1px 2px 0 rgb(0 0 0 / 0.30)',
				'card-hover':
					'0 12px 32px -12px rgb(0 0 0 / 0.60), 0 0 0 1px rgb(255 255 255 / 0.05)',
				hero: '0 28px 70px -24px rgb(0 0 0 / 0.70)',
				cta: '0 8px 24px -8px rgb(244 180 0 / 0.45)',
			},
			transitionTimingFunction: {
				'out-soft': 'cubic-bezier(0.16,1,0.3,1)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
