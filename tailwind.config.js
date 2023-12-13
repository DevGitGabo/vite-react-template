/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Aclonica: ["Aclonica"],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
  ],
};
