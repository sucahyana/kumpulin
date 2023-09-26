/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                white: "#fff",
                "gray-200": "#d5dae1",
                "dark-gray-300": "#b0b5bd",
                "info-500": "#3b82f6",
                "gray-800": "#333f51",
                "info-050": "#f5f9ff",
                "gray-500": "#556987",
                "gray-900": "#2a3342",
            },
            fontFamily: {
                "text-xs-medium": "Poppins",
            },
            fontSize: {
                xs: "12px",
                base: "16px",
                sm: "14px",
                lg: "18px",
                "11xl": "30px",
            },
            keyframes: {
                typing: {
                    "0%": {
                        width: "0%",
                        visibility: "hidden",
                    },
                    "100%": {
                        width: "100%",
                    },
                },
                blink: {
                    "50%": {
                        borderColor: "transparent",
                    },
                    "100%": {
                        borderColor: "#3B82F6",
                    },
                },
            },
            animation: {
                typing: "typing 2s steps(20) infinite alternate, blink .5s infinite",
                long_typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
            },
        },
    },
    plugins: [],
};
