let plugins = [
  [
    "component",
    {
      libraryName: "element-ui",
      styleLibraryName: "theme-chalk"
    }
  ]
]

if (process.env.NODE_ENV === "production") {    // 打包不会出现consol.log
  plugins.push("transform-remove-console");
}


module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"], plugins

};
