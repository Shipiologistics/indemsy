import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    nightBlue: "var(--primary-night-blue)",
                    orange: "var(--primary-orange)",
                },
            },
        },
    },
    plugins: [],
};
export default config;
