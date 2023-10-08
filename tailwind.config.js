import react from "@vitejs/plugin-react-swc";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        main: "#2B67A5",
        white: "#FFFFFF",
        primary: "#1677ff",
      },
    },
  },
  plugins: [react()],
};
