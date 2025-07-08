export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            img: {
              borderRadius: theme("borderRadius.lg"),
              marginTop: theme("spacing.4"),
              marginBottom: theme("spacing.4"),
            },
          },
        },
      }),
    },
  },

  plugins: [],
};

  