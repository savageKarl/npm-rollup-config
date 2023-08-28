// 这里引入这个插件的原因是，rpt2在打包有使用 rollup-plugin-dts的模块 总会报错，没办法解决。
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json" };
import { commonPlugins } from "./src/modules/commonPlugins.js";
import { tsconfigDefaults } from "./src/modules/tsconfigDefaults.js";
import { dtsBundleConfig } from "./src/modules/dtsBundleConfig.js";
import { commonInputAndOutput } from "./src/modules/commonInputAndOutput.js";
import { commonExternal } from "./src/modules/commonExternal.js";

export default [
  {
    ...commonInputAndOutput(),
    plugins: [typescript(tsconfigDefaults)].concat(...commonPlugins()),
    ...commonExternal(pkg, "child_process"),
  },
  dtsBundleConfig(),
];
