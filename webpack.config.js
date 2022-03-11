const path = require('path');
console.log('Build path: ', path.resolve(__dirname, 'build'));

module.exports = {
  entry: './src/app.js',
  // mode: 'development',
  mode: 'production',
  output: {
    path: path.join(__dirname, '/build/'),
    filename: 'index.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
};
