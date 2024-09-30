// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-bg": "url('/src/assets/bgregister.webp')",
      },
      colors: {
        blue: {
          500: "#3b82f6",
          600: "#2563eb",
        },
        red: {
          500: "#ef4444",
          600: "#dc2626",
        },
        green: {
          500: "#10B981", // Futbol sahasi yesili
          700: "#047857", // Arka plan yesili
        },
      },
      width: {
        80: "20rem", // 320px
        96: "24rem", // 384px
      },
      height: {
        100: "25rem", // 400px
        120: "30rem", // 480px
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
