// let rollup to package ts
// https://www.npmjs.com/package/rollup-plugin-typescript2
import rtp2 from "rollup-plugin-typescript2";
// rollup command plugin,use to execute command for custom
import { rollupCommand } from "savage-rollup-command";

import { tsconfigDefaults } from "./tsconfigDefaults.js";
import { commonPlugins } from "./commonPlugins.js";
import { commonInputAndOutput } from "./commonInputAndOutput.js";
import { commonExternal } from "./commonExternal.js";

export const mainBundleConfig = (pkg) => {
  return {
    ...commonInputAndOutput(),
    plugins: [
      ...commonPlugins(),
      rtp2({
        tsconfigDefaults,
      }),
      rollupCommand({
        buildEnd(run) {
          run("cd example && yarn dev");
        },
      }),
    ],
    ...commonExternal(pkg),
  };
};
