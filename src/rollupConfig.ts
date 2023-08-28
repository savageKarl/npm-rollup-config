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
// https://www.npmjs.com/package/rollup-obfuscator
import { obfuscator } from "rollup-obfuscator";

// https://www.npmjs.com/package/@rollup/plugin-json
// Convert JSON files to ES Modules.
import json from "@rollup/plugin-json";

import { RollupOptions } from "rollup";
// rollup command plugin,use to execute command for custom
import { rollupCommand } from "savage-rollup-command";

import { obfusctorConfig } from "./modules/obfusctorConfig.js";
import { tsconfigDefaults } from "./modules/tsconfigDefaults.js";
import { dtsBundleConfig } from "./modules/dtsBundleConfig.js";

export const getRollupConfig = (
  pkg: any,
  hook?: (options: RollupOptions[]) => RollupOptions[] | null
) => {
  const isPro = process.env.mode === "pro";

  const rollConfig: RollupOptions[] = [
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
        commonjs(), // parse the module of commonjs specifications
        resolve(), // parse third-party lib, because rollup only can parse local module
        ts({
          tsconfigDefaults,
        }),
        json(),
        rollupCommand({
          buildEnd(run) {
            run("cd example && yarn dev");
          },
        }),
        ...(isPro ? [obfuscator(obfusctorConfig as any)] : []),
      ],
      external: [...Object.keys(pkg.dependencies || {})],
    },
    dtsBundleConfig() as RollupOptions,
  ];

  hook?.(rollConfig);

  return rollConfig;
};
