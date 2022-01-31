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
	plugins: ['daisyui']
};

module.exports = config;
