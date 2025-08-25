export default {
  test: {
    include: ["test/**/*.test.js"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.js"],
      exclude: ["test/**/*.js", "src/data/*", "src/locales/*"],
    },
    environment: "happy-dom",
  },
};
