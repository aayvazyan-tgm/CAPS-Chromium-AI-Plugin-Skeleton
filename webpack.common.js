const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'popup/popup': './src/popup/popup.ts',
    'config/config': './src/config/config.ts',
    'background/background': './src/background/background.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  optimization: {
    // Important: Don't split chunks for extension
    splitChunks: false,
    // Important for Manifest V3 service workers
    runtimeChunk: false,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' },
        { from: 'src/popup/popup.html', to: 'popup/popup.html' },
        { from: 'src/popup/popup.css', to: 'popup/popup.css' },
        { from: 'src/config/config.html', to: 'config/config.html' },
        { from: 'src/config/config.css', to: 'config/config.css' },
        { from: 'assets/icons', to: 'icons' },
      ],
    }),
  ],
};
