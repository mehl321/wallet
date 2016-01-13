var env = process.env.NODE_ENV || 'development';

console.log('Environment: ' + env + '\n');

var config = require('./webpack.config-' + env + '.js');

module.exports = config;
// wallet