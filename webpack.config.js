// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Make sure this is installed (v6+)

module.exports = {
  // Mode: 'production' for optimizations, 'development' for source maps and faster builds
  mode: 'production',

  entry: './src/index.js',

  output: {
    // Output directory
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',

    clean: true,
    publicPath: '/', // <-- ADJUST THIS IF DEPLOYING TO A SUBDIRECTORY

    // Consistent naming for assets loaded via JS/CSS imports
    assetModuleFilename: 'assets/[name].[hash][ext][query]',
  },

  // Module rules for handling different file types
  module: {
    rules: [
      {
        // Handle CSS files
        test: /\.css$/i, // Matches files ending with .css (case-insensitive)
        // Loaders are applied in reverse order (css-loader -> style-loader)
        use: [
          'style-loader', // Injects styles into the DOM via <style> tags
          'css-loader', // Resolves @import and url() like import/require()
        ],
      },
      {
        // Handle image and font files using Webpack 5 Asset Modules
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource', // Copies the file to the output directory
        // generator: { // Optional: customize output path/filename for these assets
        //   filename: 'assets/[name].[hash][ext]'
        // }
      },
      // Add rules for Babel (JS transpilation) or TypeScript if needed
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: { presets: ['@babel/preset-env'] }
      //   }
      // }
    ],
  },

  // Plugins for additional build steps
  plugins: [
    // Generates an HTML file, injecting the bundled JavaScript.
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to your HTML template file
      inject: 'body', // Inject the script tag into the <body>
      // You can add other options like favicon, title, etc.
      // title: 'My App',
    }),

    // Copies individual files or entire directories, which already exist, to the build directory.
    new CopyWebpackPlugin({
      patterns: [
        // Copy contents of public/static to dist/static
        {
          from: 'public', // Source directory/file
          to: '.',         // Destination directory within 'dist'
          noErrorOnMissing: true // Prevents errors if 'public/static' doesn't exist
          // globOptions: { // Optional: ignore specific files within the source
          //   ignore: ['**/ignored-file.txt'],
          // },
        },
        // Add more patterns here if needed
        // { from: 'path/to/other/assets', to: 'other-assets' }
        // { from: 'CNAME', to: '.' } // Example: Copy CNAME file to dist root
      ],
    }),
  ],

  // Development server configuration (optional, for local development)
  // devServer: {
  //   static: './dist', // Serve files from the 'dist' directory
  //   open: true,       // Open browser automatically
  //   hot: true,        // Enable Hot Module Replacement
  // },

  // Source map configuration (useful for debugging)
  // Use 'source-map' for production (separate file), 'inline-source-map' for development
  // devtool: 'source-map', // Adjust as needed
};
