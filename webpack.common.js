const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'popup/popup': './src/popup/popup.ts',
    'options/options': './src/options/options.ts',
    'background/background': './src/background/background.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          /\.test\.ts$/,
          /\.spec\.ts$/,
          /__tests__/,
          /test-setup\.ts$/,
          /e2e/,
        ],
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
        { from: 'src/options/options.html', to: 'options/options.html' },
        { from: 'src/options/options.css', to: 'options/options.css' },
        { from: 'assets/icons', to: 'icons' },
      ],
    }),
  ],
};
