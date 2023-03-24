const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => ({
  entry: "./src/js/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app-[hash].js",
    clean: true,
    environment: {
      // The environment supports arrow functions ('() => { ... }').
      arrowFunction: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style-[hash].css",
    }),
  ],
  devServer: {
    // static: {
    //   directory: path.join(__dirname, 'public'),
    // },
    compress: true,
    port: 9000,
    watchFiles: ["*.html", "*.css", "*.sass"],
  },
  devtool: env.production ? "source-map" : "eval-source-map",
  mode: env.production ? "production" : "development",
  module: {
    rules: [
      // ### Babel ###
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
          },
        },
      },
      // ### SASS ###
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      // Download images
      {
        test: /\.(png|jpeg|jpg)/,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext]",
        },
      },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[path][name].[ext]',
      //   },
      // },
      // HTML-loader
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
});
