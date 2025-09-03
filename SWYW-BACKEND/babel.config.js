export default {
  presets: [
    "@babel/preset-typescript",
    ["@babel/preset-env", { targets: { node: "current" }, modules: false }],
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["babel-plugin-add-module-exports"],
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@src": "./src",
        },
      },
    ],
    ["babel-plugin-add-import-extension", { extension: "js" }],
  ],
}
