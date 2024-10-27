/** @format */

import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config: Config = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			animation: {
				shake: "shake 0.5s ease-in-out",
			},
			keyframes: {
				shake: {
					"0%, 100%": { transform: "translateX(0)" },
					"20%, 60%": { transform: "translateX(-5px)" },
					"40%, 80%": { transform: "translateX(5px)" },
				},
			},
		},
	},
	plugins: [],
};
export default withUt(config);
