// let rollup to package ts
// https://www.npmjs.com/package/rollup-plugin-typescript2
import ts from "rollup-plugin-typescript2";
// let rollup to convert CommonJS modules to ES6, because it can only parse ES6 modules by default
// https://www.npmjs.com/package/@rollup/plugin-commonjs
import commonjs from "rollup-plugin-commonjs";
//let rollup parse third-party lib, because it only can parse local modul
// https://www.npmjs.com/package/@rollup/plugin-node-resolve
import resolve from "@rollup/plugin-node-resolve";
// let rollup can delete any folder and files
// https://www.npmjs.com/package/rollup-plugin-delete
// import del from 'rollup-plugin-delete'
// let rollup can minify code
// https://www.npmjs.com/package/@rollup/plugin-terser
// import terser from '@rollup/plugin-terser';
// used to obfuscate your code
// https://www.npmjs.com/package/rollup-plugin-dts
import { obfuscator } from "rollup-obfuscator";
// This is a plugin that lets you roll-up your .d.ts definition files.
// https://www.npmjs.com/package/rollup-plugin-dts
import { dts } from "rollup-plugin-dts";
import json from "@rollup/plugin-json";

import pkg from "./package.json" assert { type: "json" };
// import tsconfig from "./tsconfig.json" assert { type: "json" };
// 这里引入这个插件的原因是，rpt2在打包有使用 rollup-plugin-dts的模块 总会报错，没办法解决。
import typescript from "@rollup/plugin-typescript";
import { tsconfigDefaults } from "./src/modules/tsconfigDefaults.js";
import { obfusctorConfig } from "./src/modules/obfusctorConfig.js";

const isPro = process.env.mode === "pro";

export default [
  {
    input: "src/index.ts", // pack entry
    output: [
      {
        file: "dist/index.mjs", // ouput file
        format: "esm", // file module specifications
        sourcemap: true,
      },
      {
        file: "dist/index.cjs", // ouput file
        format: "cjs", // file module specifications
        sourcemap: true,
      },
    ],
    plugins: [
      json(),
      commonjs(), // parse the module of commonjs specifications
      resolve(), // parse third-party lib, because rollup only can parse local module
      typescript(tsconfigDefaults),
      ...(isPro ? [obfuscator(obfusctorConfig)] : []),
    ],
    external: [...Object.keys(pkg.dependencies || {}), "child_process"],
  },
  {
    input: "./dist/index.d.ts",
    output: [{ file: "dist/main.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
