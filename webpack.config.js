switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./webpack-config/webpack.prod')({env: 'production'});
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./webpack-config/webpack.dev')({env: 'development'});
}
