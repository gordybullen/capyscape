const path = require('path');

module.exports = {
  entry: "./src/escape.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "source-map"
}