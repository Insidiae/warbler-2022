/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				"dracula-pro": {
					primary: "#FF80BF",
					secondary: "#9580FF",
					accent: "#FFCA80",
					neutral: "#454158",
					"base-100": "#22212C",
					info: "#80FFEA",
					success: "#8AFF80",
					warning: "#FFFF80",
					error: "#FF9580",
				},
			},
		],
	},
};
