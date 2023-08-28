import { RollupOptions } from "rollup";

import { mainBundleConfig } from "./mainBundleConfig.js";
import { dtsBundleConfig } from "./dtsBundleConfig.js";

export const getRollupConfig = (
  /** package.json file */
  pkg: any,
  /** Can be used to change the default configuration */
  hook?: (options: RollupOptions[]) => RollupOptions[] | null
) => {
  // 一个bundle表示一个入口文件会被打包成一个bundle
  const rollConfig = [
    mainBundleConfig(pkg),
    dtsBundleConfig(),
  ] as RollupOptions[];

  hook?.(rollConfig);

  return rollConfig;
};
