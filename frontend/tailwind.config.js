import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            fontFamily: {
                sans: [
                    'Inter',
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'sans-serif'
                ]
            },
            fontSize: {
                xs:   ['0.75rem',  { lineHeight: '1rem' }],
                sm:   ['0.875rem', { lineHeight: '1.25rem' }],
                base: ['0.9375rem',{ lineHeight: '1.5rem' }],
                lg:   ['1.0625rem',{ lineHeight: '1.75rem' }],
                xl:   ['1.25rem',  { lineHeight: '1.75rem' }],
                '2xl':['1.5rem',   { lineHeight: '2rem' }],
                '3xl':['1.875rem', { lineHeight: '2.25rem' }],
                '4xl':['2.25rem',  { lineHeight: '2.5rem', letterSpacing: '-0.01em' }],
            },
            fontWeight: {
                medium: '500',
                semibold: '600',
            },
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                success: {
                    DEFAULT: 'oklch(var(--success) / <alpha-value>)',
                    foreground: 'oklch(var(--success-foreground))'
                },
                warning: {
                    DEFAULT: 'oklch(var(--warning) / <alpha-value>)',
                    foreground: 'oklch(var(--warning-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                pastel: {
                    green:  'oklch(var(--pastel-green))',
                    blue:   'oklch(var(--pastel-blue))',
                    pink:   'oklch(var(--pastel-pink))',
                    peach:  'oklch(var(--pastel-peach))',
                    purple: 'oklch(var(--pastel-purple))',
                    teal:   'oklch(var(--pastel-teal))',
                }
            },
            borderRadius: {
                sm:   'calc(var(--radius) - 4px)',
                md:   'calc(var(--radius) - 2px)',
                lg:   'var(--radius)',
                xl:   'calc(var(--radius) + 4px)',
                '2xl':'calc(var(--radius) + 8px)',
                '3xl':'calc(var(--radius) + 16px)',
                full: '9999px',
            },
            boxShadow: {
                xs:       '0 1px 2px 0 rgba(0,0,0,0.05)',
                subtle:   '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.08)',
                elevated: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
                fab:      '0 4px 12px 0 rgba(0,0,0,0.18)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'fade-in': {
                    '0%':   { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                'slide-up': {
                    '0%':   { transform: 'translateY(8px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)',   opacity: '1' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up':   'accordion-up 0.2s ease-out',
                'fade-in':        'fade-in 0.3s ease-out',
                'slide-up':       'slide-up 0.25s ease-out',
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
