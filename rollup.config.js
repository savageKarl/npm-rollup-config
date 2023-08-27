// let rollup to package ts
// https://www.npmjs.com/package/rollup-plugin-typescript2
import ts from 'rollup-plugin-typescript2'
// let rollup to convert CommonJS modules to ES6, because it can only parse ES6 modules by default
// https://www.npmjs.com/package/@rollup/plugin-commonjs
import commonjs from 'rollup-plugin-commonjs'
//let rollup parse third-party lib, because it only can parse local modul
// https://www.npmjs.com/package/@rollup/plugin-node-resolve
import resolve from '@rollup/plugin-node-resolve'
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
import { obfusctorConfig } from "./src/modules/obfusctorConfig.js"
import json from '@rollup/plugin-json'

import pkg from './package.json'  assert { type: 'json' }

const isPro = process.env.mode === 'pro' 

export default  [
  {
  input: "src/index.js", // pack entry
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
    // ts({
    //   tsconfig: "./tsconfig.json", // specify tsconfig.json file, use to specify the packaging file range
    // }),
    // obfuscator 的 selfDefending选项设置为 true 之后就别用 terser了，否则代码会报错，因为也没有必要了
    // terser({maxWorkers: 4}),
     ...isPro ? [obfuscator(obfusctorConfig)] : [],
  ],
  external: [...Object.keys(pkg.dependencies || {}), 'child_process'],
},
// {
//   input: "./dist/index.d.ts",
//   output: [{ file: "dist/index.d.ts", format: "es" }],
//   plugins: [dts()],
// },
]