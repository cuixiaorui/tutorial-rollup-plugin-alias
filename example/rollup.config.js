import typescript from "rollup-plugin-typescript";
import { alias } from "tutorial-rollup-plugin-alias";
// import alias from "@rollup/plugin-alias";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default {
  input: "src/index.ts",
  output: {
    file: "dist/example.js",
    format: "cjs",
  },
  plugins: [
    typescript(),
    alias({
      entries: [
        // {
        //   find: "utils",
        //   replacement: path.join(__dirname, "./src/utils"),
        // },
        {
          find: /^(.*)\.js$/,
          replacement: "$1.alias",
        },
      ],
      entries: {
        // utils: path.join(__dirname, "./src/utils"),
      },
    }),
  ],
};
