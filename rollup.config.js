// import typescript from "@rollup/plugin-typescript"; // 让 rollup 认识 ts 的代码
// import pkg from "./package.json";
//
// // 为了将引入的 npm 包，也打包进最终结果中
// import resolve from "rollup-plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";
//
// // 一段自定义的内容，以下内容会添加到打包结果中
// const footer = `
// if(typeof window !== 'undefined') {
//   window._Dry_VERSION_ = '${pkg.version}'
// }`;
//
// export default {
//   input: "./dist/index.js",
//   output: [
//     {
//       file: pkg.main,
//       format: "cjs",
//       footer
//     },
//     {
//       file: pkg.module,
//       format: "esm",
//       footer
//     },
//     {
//       file: pkg.browser,
//       format: "umd",
//       name: "Dry",
//       footer
//     }
//   ],
//   plugins: [typescript(), commonjs(), resolve()]
// };

import clear from "rollup-plugin-clear"; // 清空
import { terser } from "rollup-plugin-terser"; // 压缩
import typescript from "rollup-plugin-typescript2"; // ts 支持

const packageName = "ewelink-api-next";

export default {
  input: "src/index.ts",
  external: (id) => /test/.test(id),
  output: [
    {
      file: `dist/${packageName}.umd.js`,
      format: "umd",
      name: packageName
    },
    {
      file: `dist/${packageName}.min.js`,
      format: "umd",
      name: packageName,
      plugins: [terser()]
    },
    {
      file: `esm/${packageName}.js`,
      format: "esm"
    },
    {
      file: `lib/${packageName}.cjs.js`,
      format: "cjs"
    }
  ],
  plugins: [
    clear({
      targets: ["dist", "esm", "lib"]
    }),
    typescript() // tsconfig.json declaration:true 生成 *.d.ts
  ]
};
