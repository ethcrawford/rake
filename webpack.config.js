const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
    return merge([
      common,
      {
        mode: "development",
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [
                "style-loader",
                "css-loader",
                {
                  loader: "postcss-loader",
                  options: {
                    ident: "postcss",
                    plugins: [require("autoprefixer")()]
                  }
                }
              ]
            },
            {
              test: /\.scss$/,
              use: [
                "style-loader",
                "css-loader",
                {
                  loader: "postcss-loader",
                  options: {
                    ident: "postcss",
                    plugins: [require("autoprefixer")()]
                  }
                },
                "sass-loader"
              ]
            }
          ]
        }
      }
    ]);
  } else {
    return merge([
      common,
      {
        mode: "production",
        optimization: {
          minimizer: [new UglifyJsPlugin({}), new OptimizeCSSAssetsPlugin({})]
        },
        plugins: [
          new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
          })
        ],
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                {
                  loader: "postcss-loader",
                  options: {
                    ident: "postcss",
                    plugins: [require("autoprefixer")()]
                  }
                }
              ]
            },
            {
              test: /\.scss$/,
              use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                {
                  loader: "postcss-loader",
                  options: {
                    ident: "postcss",
                    plugins: [require("autoprefixer")()]
                  }
                },
                "sass-loader"
              ]
            }
          ]
        }
      }
    ]);
  }
};
