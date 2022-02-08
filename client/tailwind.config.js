module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      lineClamp: {
        9: 9,
      },
      gridTemplateColumns: {
        menu: "repeat(auto-fill, minmax(10em, 1fr))",
        menu2: "repeat(auto-fill, minmax(17.5em, 1fr))",
      },
      zIndex: {
        10000: "10000",
      },
      animation: {
        shadow: "shadow 0.5s alternate infinite ease",
        circle: "circle 0.5s alternate infinite ease",
      },
      keyframes: {
        shadow: {
          "0%": {
            transform: "scaleX(1.5)",
          },
          "40%": {
            transform: "scaleX(1)",
            opacity: "0.7",
          },
          "100%": {
            transform: "scaleX(0.2)",
            opacity: "0.4",
          },
        },
        circle: {
          "0%": {
            top: "60px",
            height: "5px",
            "border-radius": "50px 50px 25px 25px",
            transform: "scaleX(1.7)",
          },
          "40%": {
            height: "20px",
            "border-radius": "50%",
            transform: "scaleX(1)",
          },
          "100%": {
            top: "0%",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
