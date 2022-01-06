module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#f0bc13",
        gray: "#1f1f1f",
        darkgray :"#121211",
        light: "#fafafa",
      },
      fontSize:{
        'code': '1.1rem',
      },
      fontFamily: {
        'code': [
          "Menlo",
          "Monaco",
          '"Lucida Console"',
          '"Liberation Mono"',
          '"DejaVu Sans Mono"',
          '"Bitstream Vera Sans Mono"',
          '"Courier New"',
          "monospace",
        ],
        'body': [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
