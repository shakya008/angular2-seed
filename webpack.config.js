switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./configuration/webpack.prod')({env: 'production'});
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./configuration/webpack.dev')({env: 'development'});
}
