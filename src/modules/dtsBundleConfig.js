// This is a plugin that lets you roll-up your .d.ts definition files.
// https://www.npmjs.com/package/rollup-plugin-dts

import { dts } from "rollup-plugin-dts";
export const dtsBundleConfig = () => {
  // 在rollup -w模式下使用这个插件，input和ouput不能一样，否则会报错，这是个bug，无法解决。
  return {
    input: "./dist/index.d.ts",
    output: [{ file: "dist/main.d.ts", format: "es" }],
    plugins: [dts()],
  };
};
