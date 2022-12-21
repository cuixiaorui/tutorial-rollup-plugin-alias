import typescript from "rollup-plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/alias.js",
    format: "es",
  },
  plugins: [typescript()],
};
