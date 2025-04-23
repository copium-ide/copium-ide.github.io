const path = require('path');

module.exports = {
  mode: 'development',            // or 'production'
  entry: './src/index.js',
  output: {
    filename: './public/main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  
};
