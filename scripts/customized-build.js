/*
 本模块运行react-scripts里的脚本 (Create React App)
 可以自定义webpack配置，通过在项目根目录创建"overrides-config.dev.js" 、 "overrides-config.prod.js" 文件.

 A config-overrides file should export a single function that takes a
 config and modifies it as necessary.

 module.exports = function(webpackConfig) {
 webpackConfig.module.rules[0].use[0].options.useEslintrc = true;
 };
 */
var rewire = require('rewire');
var proxyquire = require('proxyquire');

switch (process.argv[2]){
  case 'start':
    rewireModule('react-scripts/scripts/start.js', loadCustomizer('./overrides-config.dev'));
    break;
  case 'build':
    rewireModule('react-scripts/scripts/build.js', loadCustomizer('./overrides-config.prod'));
    break;



}


function loadCustomizer(module) {
  try{
    return require(module)
  } catch(e){
    console.log(e)
    if(e.code !== 'MODULE_NOT_FOUND'){
      throw e;
    }
  }

  return config => config
}

function rewireModule(modulePath, customizer){
  let defaults = rewire(modulePath);

  let config = defaults.__get__('config');
  customizer(config);
}