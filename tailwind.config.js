/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensures Tailwind works with all JSX files
    theme: {
        extend: {
            fontFamily: {
                padauk: ['Padauk', 'sans-serif'], // Registering Padauk
            },
        },
    },
    plugins: [],
};
