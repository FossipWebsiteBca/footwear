// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"], // 
      },
      boxShadow: {
        custom: "12px 15px 20px rgba(0, 0, 0, 0.1)", // Custom shadow
      },
    },
  },
};
