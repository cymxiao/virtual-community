var chalk = require("chalk");
var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

var env = process.env.MY_ENV;
console.log('env in process :' + env);
// if(env === undefined){
//   env = 'prod';
//   console.log('if env is undefined , init env to prod');
// }

useDefaultConfig.dev.resolve.alias = {
  "@app/env": path.resolve(environmentPath('dev'))
};

useDefaultConfig.prod.resolve.alias = {
  "@app/env": path.resolve(environmentPath('prod'))
};



//Amin: Todo: not sure why in windows, env is always undefined
if ( env===undefined ||  (env !== 'prod' && env !== 'dev')) {
  console.log('Default to dev config :' + env);
  if(env===undefined){
    env = 'prod';
  } 
  useDefaultConfig[env] = useDefaultConfig.prod;
  useDefaultConfig[env].resolve.alias = {
    "@app/env": path.resolve(environmentPath(env))
  }
}


function environmentPath(env) {
  var tmpEnv = env;
  if(env===undefined){
    //filePath should return a real filepath, otherwise it would throw an error.
    tmpEnv = 'prod';
  }
  if (env) {
    var filePath = './src/environments/environment' + (tmpEnv === 'prod' ? '' : '.' + tmpEnv) + '.ts';
    console.log(tmpEnv);
    console.log(filePath);
    if (!fs.existsSync(filePath)) {
      console.log(chalk.red('\n' + filePath + ' does not exist!'));
    } else {
      return filePath;
    }
  }
}

module.exports = function () {
  return useDefaultConfig;
};
