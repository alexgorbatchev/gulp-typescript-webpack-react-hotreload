var path = require('path');

module.exports = {
  loaders: {
    react: {
      test: /\.ts(x)?$/,
      loaders: ['react-hot', 'ts-loader'],
      include: path.join(__dirname, 'src', 'client')
    },
  },
  preLoaders: {
    react: {
      test: /\.ts(x)?$/,
      loader: 'tslint'
    },
  },
  resolve: {
    alias: {},
    extensions: ['', '.tsx', '.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, 'build', 'public'),
    publicPath: '/static/',
  },
  entry: {
    app: './src/client/index.tsx',
  },
};
