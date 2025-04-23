// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,               // wipes dist/ on each build
  },
  module: {
    rules: [
      {
        test: `/\.css$/i`,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: `/\.(png|jpg|svg|gif|woff2?)$/i`,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // your HTML template
      inject: 'body',                   // where to inject <script>
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/static', to: 'static' }, // copy all files under public/static
      ],
    }),
  ],
};
