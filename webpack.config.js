// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  // ... other config sections ...

  plugins: [
    // Generates an HTML file, injecting the bundled JavaScript.
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to your HTML template file
    }),

    // Copies files BUT ignores the HTML template used by HtmlWebpackPlugin
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: './',
          noErrorOnMissing: true,
          globOptions: {
            // *** ADD THIS LINE ***
            ignore: ['**/index.html'], // Exclude the index.html file from being copied
          },
        },
        // Add more patterns here if needed for other static assets NOT in 'public'
        // or if you need more granular control.
      ],
    }),
  ],

  // ... rest of the config ...
};
