const config = {
	mode: "jit",
	content: ['./src/**/*.{html,js,svelte,ts,css}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Roboto Mono", "sans-serif"],
			  },
		}
	},
	plugins: [require('daisyui')]
};

module.exports = config;
