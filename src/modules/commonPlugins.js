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
// https://www.npmjs.com/package/rollup-obfuscator
import { obfuscator } from "rollup-obfuscator";
// https://www.npmjs.com/package/@rollup/plugin-json
// Convert JSON files to ES Modules.
import json from "@rollup/plugin-json";

import { obfusctorConfig } from "./obfusctorConfig.js";

export const commonPlugins = () => {
  const isPro = process.env.mode === "pro";
  return [
    commonjs(), // parse the module of commonjs specifications
    resolve(), // parse third-party lib, because rollup only can parse local module

    json(),
    ...(isPro ? [obfuscator(obfusctorConfig)] : []),
  ];
};
