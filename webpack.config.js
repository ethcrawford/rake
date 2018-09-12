const path = require('path');
const merge = require('webpack-merge');

const common = merge([
  {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
]);

module.exports = function(env) {
  if (env === 'development') {
    return merge([common, { mode: 'development' }]);
  } else {
    return merge([common, { mode: 'production' }]);
  }
};
