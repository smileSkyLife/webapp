const baseConfig = require('./overrides-config.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('react-scripts/config/paths');

const publicPath = paths.serverdPath;
const shouldUseRelativeAssetPaths = publicPath === './';

const cssFileName = 'static/css/[name].[contenthash:8].css';
const extractTextPluginOptions = shouldUseRelativeAssetPaths ? // Making sure that the publicPath goes back to to build folder.
  { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

module.exports = function(config){
  let alias = config.resolve.alias;
  alias['@'] = baseConfig.rootPath;

  // Use your ESLint
  /*let eslintLoader = config.module.rules[0];
   eslintLoader.use[0].options.useEslintrc = true;*/

  let loaderList = config.module.rules[1].oneOf;
  loaderList.splice(loaderList.length - 1, 0, {
    test: /\.styl$/,
    loader: ExtractTextPlugin.extract(
      Object.assign({
        fallback: {
          loader: require.resolve('style-loader'),
          options: {
            hmr: false
          }
        },
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              minimize: true,
              sourceMap: true
            }
          },
          {
            loader: require.resolve('stylus-loader')
          }
        ]
      }
    ), extractTextPluginOptions)
  });

  config.plugins.push(baseConfig.stylusLoaderOptionsPlugin);
}