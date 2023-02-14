/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#264a97",
        secondary: "#e8e8e8",
        grey: "#a5a5a5",
        "light-grey": "#f2f4fa",
        "dark-grey": "#313131",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  important: true,
}
