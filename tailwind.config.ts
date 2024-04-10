import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			animation: {
				scaleIn: "scaleIn 2s",
				opacityUp: "opacityUp 2s forwards",
				topUp: "topUp 1s forwards",
			},
			keyframes: {
				scaleIn: {
					"0%": { width: "0px" },
					"100%": { width: "max-content" },
				},
				opacityUp: {
					"0%": { opacity: ".8" },
					"100%": { opacity: "0" },
				},
				topUp: {
					"0%": { top: "500%" },
					"100%": { top: "100px" },
				},
				changeColor: {
					"0%": { color: "500%" },
					"100%": { top: "100px" },
				},
			},
		},
	},
	plugins: [],
};
export default config;
