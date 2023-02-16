/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "green1":"#E1F1AC",
        "green2":"#C4F78D",
        "green3":"#92F02D",
        "green4":"#71CD0E",
        "green5":"#5CA70C",
        "green6":"#447C09"
      }
    },
    fontFamily:{
      "base":['Gugi', "cursive"]
    }
  },
  plugins: [],
}
