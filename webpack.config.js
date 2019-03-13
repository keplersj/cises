const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    "college-scheduler": "./src/college-scheduler.tsx"
  },

  output: {
    // This copies each source entry into the extension dist folder named
    // after its entry config key.
    path: __dirname + "/build",
    filename: "[name].js"
  },

  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [
    new CopyPlugin([{ from: "./src/manifest.json", to: "./manifest.json" }])
  ]
};
