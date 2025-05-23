import type { Config } from "tailwindcss";

const config = {
      darkMode: ["class"],
      content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
      prefix: "",
      theme: {
      	container: {
      		center: true,
      		padding: '2rem',
      		screens: {
      			'2xl': '1400px'
      		}
      	},
      	extend: {
      		colors: {
      			'color-main': 'var(--color-main)',
      			'color-main-hover': 'var(--color-main-hover)',
      			'color-section-theme': 'var(--color-section-theme)',
      			'color-gap-empty': 'var(--color-gap-empty)',
      			'text-theme': 'var(--text-theme)',
      			'border-color': 'var(--border-color)',
      			'bg-input-theme': 'var(--bg-input-theme)',
      			'bg-form-nav': 'var(--bg-form-nav)',
      			'btn-design': 'var(--btn-design)',
      			'bg-model': 'var(--bg-model)',
      			'color-btn-primarily': 'var(--color-btn-primarily)',
      			'toast-success': 'var(--toast-success)',
      			'toast-error': 'var(--toast-error)',
      			'toast-warning': 'var(--toast-warning)',
      			formCoreBgColor: 'rgb(253 242 248)',
      			textHeader: 'rgb(119, 118, 114)',
      			textMain: 'rgb(55, 53, 47)',
      			pinkCustom: 'rgb(248, 28, 229)',
      			textGray: 'rgb(137,136,132)',
      			border: 'hsl(var(--border))',
      			input: 'hsl(var(--input))',
      			ring: 'hsl(var(--ring))',
      			background: 'hsl(var(--background))',
      			foreground: 'hsl(var(--foreground))',
      			primary: {
      				DEFAULT: 'hsl(var(--primary))',
      				foreground: 'hsl(var(--primary-foreground))'
      			},
      			secondary: {
      				DEFAULT: 'hsl(var(--secondary))',
      				foreground: 'hsl(var(--secondary-foreground))'
      			},
      			destructive: {
      				DEFAULT: 'hsl(var(--destructive))',
      				foreground: 'hsl(var(--destructive-foreground))'
      			},
      			muted: {
      				DEFAULT: 'hsl(var(--muted))',
      				foreground: 'hsl(var(--muted-foreground))'
      			},
      			accent: {
      				DEFAULT: 'hsl(var(--accent))',
      				foreground: 'hsl(var(--accent-foreground))'
      			},
      			popover: {
      				DEFAULT: 'hsl(var(--popover))',
      				foreground: 'hsl(var(--popover-foreground))'
      			},
      			card: {
      				DEFAULT: 'hsl(var(--card))',
      				foreground: 'hsl(var(--card-foreground))'
      			},
      			chart: {
      				'1': 'hsl(var(--chart-1))',
      				'2': 'hsl(var(--chart-2))',
      				'3': 'hsl(var(--chart-3))',
      				'4': 'hsl(var(--chart-4))',
      				'5': 'hsl(var(--chart-5))'
      			}
      		},
      		borderRadius: {
      			lg: 'var(--radius)',
      			md: 'calc(var(--radius) - 2px)',
      			sm: 'calc(var(--radius) - 4px)'
      		},
      		keyframes: {
      			'accordion-down': {
      				from: {
      					height: '0'
      				},
      				to: {
      					height: 'var(--radix-accordion-content-height)'
      				}
      			},
      			'accordion-up': {
      				from: {
      					height: 'var(--radix-accordion-content-height)'
      				},
      				to: {
      					height: '0'
      				}
      			},
      			modeScreen: {
      				'0%': {
      					transform: 'scale(.8)'
      				},
      				'100%': {
      					transform: 'none'
      				}
      			},
      			scaleIn: {
      				'0%': {
      					backgroundPosition: '10%'
      				},
      				'50%': {
      					backgroundPosition: '50%'
      				},
      				'80%': {
      					backgroundPosition: '100%'
      				},
      				'100%': {
      					backgroundPosition: '100% -50%'
      				}
      			},
      			showModelNotSave: {
      				'0%': {
      					top: '-100%'
      				},
      				'100%': {
      					top: '3rem'
      				}
      			},
      			hiddenToast: {
      				'0%': {
      					opacity: '0.5',
      					left: '0'
      				},
      				'100%': {
      					opacity: '1',
      					left: '150%'
      				}
      			},
      			ltr: {
      				'0%': {
      					left: '0'
      				},
      				'40%': {
      					left: '40%'
      				},
      				'80%': {
      					left: '60%'
      				},
      				'100%': {
      					right: '0rem'
      				}
      			},
      			rtl: {
      				'0%': {
      					right: '0'
      				},
      				'40%': {
      					right: '40%'
      				},
      				'80%': {
      					right: '80%'
      				},
      				'100%': {
      					left: '0'
      				}
      			},
      			btt: {
      				'0%': {
      					bottom: '-100%',
      					opacity: '0'
      				},
      				'100%': {
      					bottom: '150%',
      					opacity: '1'
      				}
      			},
      			ttb: {
      				'0%': {
      					bottom: '150%',
      					opacity: '1'
      				},
      				'10%': {
      					bottom: '140%',
      					opacity: '.3'
      				},
      				'100%': {
      					bottom: '-450%',
      					opacity: '0'
      				}
      			},
      			ltrColor: {
      				'0%': {
      					width: '-10%'
      				},
      				'5%': {
      					width: '0%'
      				},
      				'10%': {
      					width: '10%'
      				},
      				'20%': {
      					width: '15%'
      				},
      				'30%': {
      					width: '20%'
      				},
      				'40%': {
      					width: '25%'
      				},
      				'50%': {
      					width: '35%'
      				},
      				'60%': {
      					width: '45%'
      				},
      				'70%': {
      					width: '50%'
      				},
      				'80%': {
      					width: '60%'
      				},
      				'90%': {
      					width: '80%'
      				},
      				'100%': {
      					width: '100%'
      				}
      			},
      			rtlColor: {
      				'0%': {
      					width: '100%'
      				},
      				'20%': {
      					width: '90%'
      				},
      				'30%': {
      					width: '70%'
      				},
      				'40%': {
      					width: '60%'
      				},
      				'50%': {
      					width: '50%'
      				},
      				'60%': {
      					width: '40%'
      				},
      				'70%': {
      					width: '30%'
      				},
      				'80%': {
      					width: '20%'
      				},
      				'90%': {
      					width: '10%'
      				},
      				'100%': {
      					width: '-10%'
      				}
      			},
      			changeColorWithTime: {
      				'0%': {
      					color: '#000'
      				},
      				'100%': {
      					color: '#fff'
      				}
      			},
      			changeBgColorWithTime: {
      				'100%': {
      					background: '#fff'
      				}
      			}
      		},
      		animation: {
      			'accordion-down': 'accordion-down 0.2s ease-out',
      			'accordion-up': 'accordion-up 0.2s ease-out',
      			scaleIn: 'scaleIn 2s forwards',
      			opacityUp: 'opacityUp 2s forwards',
      			topUp: 'topUp 3s forwards',
      			topDown: 'topDown 3s forwards',
      			changeColorSea: 'changeColorSea 4s forwards',
      			showModelNotSave: 'showModelNotSave 2s ',
      			sizeLigth: 'sizeLight 1.8s forwards',
      			changeColor: 'changeColor 4s forwards',
      			rotate: 'rotate 1s infinite',
      			shipRun: 'shipRun 10s forwards',
      			modeScreen: 'modeScreen 1s forwards',
      			runLTR: 'runLTR 5s forwards',
      			hiddenToast: 'hiddenToast 2s forwards',
      			ltr: 'ltr 0s forwards',
      			rtl: 'rtl .1s forwards ',
      			btt: 'btt .2s forwards ',
      			ttb: 'ttb .2s forwards ',
      			ltrColor: 'ltrColor 0s linear forwards ',
      			rtlColor: 'rtlColor 0s linear forwards ',
      			changeColorWithTime: 'changeColorWithTime 2.4s linear forwards ',
      			changeBgColorWithTime: 'changeBgColorWithTime 2.4s linear forwards '
      		}
      	}
      },
      plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
