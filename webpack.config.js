const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function addPage(page) {
  const filename = page + ".html";
  const template = path.resolve(__dirname, "src", filename);

  return {
    plugins: [
      new HtmlWebpackPlugin({
        entry: "main",
        filename: filename,
        template: template
      })
    ]
  };
}

const common = merge([
  {
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist")
    }
  },
  addPage("index"),
  addPage("one"),
  addPage("two")
]);

module.exports = function(env) {
  if (env === "development") {
    return merge([common, { mode: "development" }]);
  } else {
    return merge([common, { mode: "production" }]);
  }
};
